
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
  try {
    console.log("submitWarrantyRegistration called with:", { formData, userId: user.uid });
    
    // Add detailed authentication debugging
    console.log("User authentication details:", {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      accessToken: await user.getIdToken(),
      isAnonymous: user.isAnonymous,
      providerData: user.providerData
    });
    
    // Wait for fresh token to ensure we have valid authentication
    const token = await user.getIdToken(true);
    console.log("Fresh ID token obtained:", token ? "✓ Token exists" : "✗ No token");
    
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
    console.log("Collection path: warranty_submissions");
    
    const docRef = await addDoc(collection(db, 'warranty_submissions'), submissionData);
    console.log('Warranty submission saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting warranty registration:', error);
    
    // Enhanced error logging with Firebase-specific details
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Check for specific Firebase permission errors
      if (error.message.includes('Missing or insufficient permissions')) {
        console.error('🔥 FIREBASE PERMISSION ERROR:');
        console.error('- Check if user is properly authenticated');
        console.error('- Verify Firestore security rules');
        console.error('- User ID:', user?.uid);
        console.error('- User email:', user?.email);
      }
    }
    
    throw error; // Re-throw the original error so the form can handle it
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
