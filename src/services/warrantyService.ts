
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';

export interface WarrantySubmission {
  id?: string;
  user_id: string;
  product_name: string;
  serial_number: string;
  purchase_date: string;
  submitted_at: any; // Firestore Timestamp
}

export const submitWarrantyRegistration = async (
  formData: {
    product_name: string;
    serial_number: string;
    purchase_date: string;
  },
  user: User
): Promise<string> => {
  try {
    const submissionData = {
      user_id: user.uid,
      product_name: formData.product_name,
      serial_number: formData.serial_number,
      purchase_date: formData.purchase_date,
      submitted_at: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'warranty_submissions'), submissionData);
    console.log('Warranty submission saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting warranty registration:', error);
    throw new Error('Failed to submit warranty registration');
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
