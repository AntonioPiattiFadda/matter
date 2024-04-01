import { db } from '@/../firebaseConfig';
import { CreateUser, Invoice, UpdateCompanyInfo } from '@/types';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

export const getUserByEmail = async (email: string) => {
  const itemCollection = collection(db, 'users');

  const q = query(itemCollection, where('email', '==', email));

  const querySnapshot = await getDocs(q);

  let user = null;

  querySnapshot.forEach((doc) => {
    user = {
      id: doc.id,
      ...doc.data(),
    };
  });

  return user;
};

export const createUser = async (userData: CreateUser) => {
  try {
    const userCollection = collection(db, 'users');

    const newUserRef = await addDoc(userCollection, userData);

    //NOTE probar esta funcion
    console.log('Usuario creado con ID: ', newUserRef.id);

    return newUserRef.id;
  } catch (error) {
    console.error('Error al crear el usuario: ', error);
    throw new Error('No se pudo crear el usuario');
  }
};

export const updateUser = async (
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: UpdateCompanyInfo & { [x: string]: any }
) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, updateData);

    console.log('Usuario actualizado con éxito');

    return true;
  } catch (error) {
    console.error('Error al actualizar el usuario: ', error);
    throw new Error('No se pudo actualizar el usuario');
  }
};

export const getUserInvoices = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const invoiceCollectionRef = collection(userDocRef, 'invoices');

    const snapshot = await getDocs(invoiceCollectionRef);

    const invoices: {
      status: string;
      companyName: string;
      toCompanyName: string;
      total: number;
      dueDate: Date;
      id: string;
    }[] = [];

    snapshot.forEach((doc) => {
      return invoices.push({
        id: doc.id,
        status: '',
        companyName: '',
        toCompanyName: '',
        dueDate: new Date(),
        total: 0,
        ...doc.data(),
      });
    });

    return invoices;
  } catch (error) {
    console.error('Error al obtener las facturas del usuario: ', error);
    throw new Error('No se pudieron obtener las facturas del usuario');
  }
};

export const getInvoiceById = async (userId: string, invoiceId: string) => {
  try {
    const invoiceDoc = doc(db, 'users', userId, 'invoices', invoiceId);

    const invoiceSnapshot = await getDoc(invoiceDoc);

    if (invoiceSnapshot.exists()) {
      return {
        id: invoiceSnapshot.id,
        ...invoiceSnapshot.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la factura:', error);
    throw error;
  }
};

export const createInvoice = async (invoiceData: Invoice, userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const invoiceCollectionRef = collection(userDocRef, 'invoices');

    const newInvoiceRef = await addDoc(invoiceCollectionRef, invoiceData);

    console.log('Factura creada con ID: ', newInvoiceRef.id);

    return newInvoiceRef.id;
  } catch (error) {
    console.error('Error al crear la factura: ', error);
    throw new Error('No se pudo crear la factura');
  }
};