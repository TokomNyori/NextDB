'use client'
import Image from "next/image"

interface CardsProps {
    id: any,
    key: any,
    title: string,
    poster_path: string,
    changeModal: any,
}

const Cards: React.FC<CardsProps> = ({
    id,
    key,
    title,
    poster_path,
    changeModal,
}) => {
    const imagePath = 'https://image.tmdb.org/t/p/original';
    //<img src={`https://image.tmdb.org/t/p/original${poster}`} width={400} height={400} />
    return (
        <div className="border-[0.3px] border-gray-600 rounded-lg pt-3 px-1 pb-1" key={key}>
            <h4 className="text-sm lg:text-[0.95rem] font-bold cursor-pointer px-2 pb-2 truncate ..." onClick={(event) => changeModal(event, id)}>{title}</h4>
            <div className="cursor-pointer" onClick={(event) => changeModal(event, id)}>
                <Image
                    src={`https://image.tmdb.org/t/p/original${poster_path}`} width={400} height={400} alt="poster"
                />
            </div>
        </div>
    )
}

export default Cards