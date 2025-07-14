type FlipCardProps = {
    front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
}


export default function FlipCard({ front, back, className="" }: FlipCardProps) {
    return(
        <div className={`[perspective:1000px] w-full h-64 ${className}`}>
            <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                {/* front */}
                <div className="absolute w-full h-full backface-hidden bg-white border border-[#28B5FB] rounded-xl shadow-md p-4">
                    {front}
                </div>
                {/* back */}
                <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden bg-white border border-[#28B5FB] rounded-xl shadow-md p-4">
                    {back}
                </div>
            </div>
        </div>
    )
}