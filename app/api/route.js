import {NextResponse} from 'next/server'
import {getFirestore, collection, addDoc} from "firebase/firestore";
import app from "../../firebase";

const firestore = getFirestore(app);

export async function POST(req) {
    const data = await req.json()
    try {
        const docRef = await addDoc(collection(firestore, "responses"), data);
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
    const data = await req.json()
    try {
        const docRef = await a
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
