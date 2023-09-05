import {NextResponse} from 'next/server'
import {getFirestore, collection, addDoc, doc, getDoc} from "firebase/firestore";
import app from "../../firebase/config";

const firestore = getFirestore(app);

export async function POST(req) {
    const data = await req.json()
    try {
        const docRef = await addDoc(collection(firestore, "users"), data);
        return NextResponse.json({
            id: docRef.id,
            ...data
        })
    } catch (error) {
        return NextResponse.json({
            error: "Failed to add document"
        })
    }
}

export async function GET(req) {
    let docRef = doc(firestore, "transactions", "1");
    let document = await getDoc(docRef);
    try {
        return NextResponse.json({
            docRef : document.data()
        })
    } catch (error) {
        return NextResponse.json({
            error: "Failed to add document"
        })
    }
}
