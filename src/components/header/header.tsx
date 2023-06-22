import Image from "next/image" 
export function Header() {
    return (
        <header>
            <div>
                <Image 
                src="/logo.svg"
                height={100}
                width={150}
                alt="Logo"
                />
            </div>
            <div>

            </div>
        </header>
    )
}
