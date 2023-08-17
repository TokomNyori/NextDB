'use client'

import { ReactNode } from "react"

interface ModalProps {
    modalState: boolean,
    key: any,
    closeModal: any,
    currentID: any,
    movies: any,
    genres: any,
    val: string,
}


const Modal: React.FC<ModalProps> = ({ modalState, closeModal, currentID, movies, genres, val, key }) => {
    // for (let i = 0; i < 2; i++) {
    //     console.log(genres[i].name)
    // }
    let genrePull: any = []
    if (genres) {
        // @ts-ignore
        genrePull = genres.map(genre => {
            return <p key={currentID}>{genre.name}</p>
        })
    }

    // @ts-ignore
    const details = movies.map(movie => {
        console.log("Keyyyy: " + key)
        if (movie.id === currentID) {
            return (
                <div className='.content-wrapper' key={currentID}>
                    <div className="modal-heading">
                        <div className='mr-5'>{val === 'tv_popular' ? movie.name : movie.title}</div>
                        <div className='close-btn cursor-pointer' onClick={closeModal}>X</div>
                    </div>
                    <div className='modal-body'>
                        <div className='details'>
                            <div className='movie-description text-left'>
                                <h1><span className='font-bold'>Vote Average:</span> {movie.vote_average}</h1>
                                <p><span className='font-bold'>Original Lang:</span> {movie.original_language}</p>
                                <div>
                                    <p className='font-bold'>Genres:</p>
                                    <div className='ml-2'>
                                        {genrePull?.length < 3 ? genrePull :
                                            <div>
                                                <p>{genrePull?.[0]}</p>
                                                <p>{genrePull?.[1]}</p>
                                                <p>{genrePull?.[2]}</p>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className='modal-image-cover'>
                                <img
                                    className='modal-image'
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""
                                />
                            </div>
                        </div>
                        <div className='bottom-part text-left'>
                            <p><span className='font-bold'>Release Date:</span> {movie.release_date}</p>
                            <p>
                                <span className='font-bold text-green-300'>Overview:</span> {movie.overview}
                            </p>
                            <div className='mt-4 mb-5'>
                                <img
                                    className='rounded-lg'
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    )

    return (
        <div
            className={`modal-blur inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center
                        ${modalState ? "fix-modal" : "hidden"} flex-wrap`}
        >
            <div className="modal rounded-lg py-6" >
                {details}
            </div>
        </div>
    )
}

export default Modal