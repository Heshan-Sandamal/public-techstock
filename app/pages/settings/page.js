import Navbar from "@/components/Navbar";
import Form from "@/components/Form";

export default function Home() {
    return (
        <>
            <Navbar/>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Form />
            </main>
        </>
    )
}
