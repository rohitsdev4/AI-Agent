import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';
import { Transaction } from '@/lib/types';

// This secret should be stored in an environment variable (`process.env.SHEET_INGEST_SECRET`).
// Due to environment limitations, it's hardcoded here as a workaround.
const SHEET_INGEST_SECRET = 'a-very-secret-token-from-google-sheet';

export async function POST(req: NextRequest) {
  // 1. Validate the secret token from the request header
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${SHEET_INGEST_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Parse and validate the incoming JSON data
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ message: 'Invalid request body: expected an array of transactions.' }, { status: 400 });
    }

    const transactions: Omit<Transaction, 'id'>[] = body.map((item: any) => {
      // Basic validation to ensure required fields exist
      if (item.type === undefined || item.amount === undefined || item.category === undefined || item.date === undefined) {
        throw new Error('One or more transactions are missing required fields (type, amount, category, date).');
      }
      return {
        type: item.type,
        amount: Number(item.amount),
        category: String(item.category),
        subCategory: String(item.subCategory || ''),
        date: String(item.date),
        notes: String(item.notes || ''),
      };
    });

    if (transactions.length === 0) {
      return NextResponse.json({ message: 'No transactions to process.' }, { status: 200 });
    }

    // 3. Use a Firestore batch write to save all transactions atomically
    const batch = firestore.batch();
    const transactionsCollection = firestore.collection('transactions');

    transactions.forEach(transaction => {
      const docRef = transactionsCollection.doc(); // Let Firestore auto-generate a document ID
      batch.set(docRef, transaction);
    });

    await batch.commit();

    return NextResponse.json({ message: `Successfully ingested ${transactions.length} transactions.` }, { status: 201 });

  } catch (error) {
    console.error('Error during data ingestion:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message: 'Failed to ingest data.', error: errorMessage }, { status: 500 });
  }
}
