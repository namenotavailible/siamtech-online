
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';

export interface WarrantyRegistration {
  id?: string;
  userId: string;
  productId: string;
  productName: string;
  orderNumber: string;
  purchaseDate: string;
  purchaseSource: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  timestamp: Date;
}

export const submitWarrantyRegistration = async (
  formData: Omit<WarrantyRegistration, 'id' | 'userId' | 'timestamp'>,
  user: User
): Promise<string> => {
  try {
    const warrantyData = {
      ...formData,
      userId: user.uid,
      timestamp: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'warranty_registrations'), warrantyData);
    console.log('Warranty registration submitted with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting warranty registration:', error);
    throw new Error('Failed to submit warranty registration');
  }
};

export const getUserWarrantyRegistrations = async (user: User): Promise<WarrantyRegistration[]> => {
  try {
    const q = query(
      collection(db, 'warranty_registrations'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const registrations: WarrantyRegistration[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      registrations.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate(),
      } as WarrantyRegistration);
    });
    
    return registrations;
  } catch (error) {
    console.error('Error fetching warranty registrations:', error);
    throw new Error('Failed to fetch warranty registrations');
  }
};
