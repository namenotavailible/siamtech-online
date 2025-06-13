
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';

export interface WarrantySubmission {
  id?: string;
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  product_name: string;
  order_number: string;
  purchase_date: string;
  source_of_purchase: string;
  submitted_at: any; // Firestore Timestamp
}

export const submitWarrantyRegistration = async (
  formData: {
    full_name: string;
    email: string;
    phone_number: string;
    product_name: string;
    order_number: string;
    purchase_date: string;
    source_of_purchase: string;
  },
  user: User
): Promise<string> => {
  console.log("=== FIRESTORE SUBMISSION START ===");
  console.log("User:", { 
    uid: user.uid, 
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous
  });
  console.log("Form data:", formData);
  
  try {
    // Verify user is authenticated
    if (!user || !user.uid) {
      throw new Error("User not authenticated - no UID");
    }
    
    // Wait a moment to ensure auth state is fully settled
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get fresh token with force refresh to ensure we have valid auth
    console.log("Getting fresh authentication token...");
    const token = await user.getIdToken(true);
    console.log("Token obtained:", !!token);
    
    // Additional auth verification
    if (!token) {
      throw new Error("Failed to obtain authentication token");
    }
    
    const submissionData = {
      user_id: user.uid,
      full_name: formData.full_name,
      email: formData.email,
      phone_number: formData.phone_number,
      product_name: formData.product_name,
      order_number: formData.order_number,
      purchase_date: formData.purchase_date,
      source_of_purchase: formData.source_of_purchase,
      submitted_at: serverTimestamp(),
    };

    console.log("Submitting data to Firestore:", submissionData);
    console.log("Auth token available:", !!token);
    
    // Try the Firestore write
    const docRef = await addDoc(collection(db, 'warranty_submissions'), submissionData);
    console.log('✅ Warranty submission successful! Document ID:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('❌ FIRESTORE ERROR:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: (error as any).code
      });
      
      // Check if it's a permission error
      if (error.message.includes("Missing or insufficient permissions")) {
        console.error("PERMISSION ERROR: User may not be properly authenticated for Firestore");
        console.error("Current user state:", {
          uid: user?.uid,
          email: user?.email,
          emailVerified: user?.emailVerified
        });
      }
    }
    
    throw error;
  }
};

export const getUserWarrantySubmissions = async (user: User): Promise<WarrantySubmission[]> => {
  try {
    const q = query(
      collection(db, 'warranty_submissions'),
      where('user_id', '==', user.uid),
      orderBy('submitted_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const submissions: WarrantySubmission[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      submissions.push({
        id: doc.id,
        ...data,
      } as WarrantySubmission);
    });
    
    return submissions;
  } catch (error) {
    console.error('Error fetching warranty submissions:', error);
    throw new Error('Failed to fetch warranty submissions');
  }
};
