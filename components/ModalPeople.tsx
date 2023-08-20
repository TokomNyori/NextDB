'use client'

import { ReactNode } from "react"

interface ModalProps {
    modalState: boolean,
    key: any,
    closeModal: any,
    currentID: any,
    datas: any,
    val: string,
    page_name: string,
    detail: any,
}


const ModalPeople: React.FC<ModalProps> = ({ modalState, closeModal, currentID, datas, val, key, page_name, detail }) => {
    // for (let i = 0; i < 2; i++) {
    //     console.log(genres[i].name)
    // }
    // let detailsPull: any = []
    // if (!detail.success === false) {
    //     // @ts-ignore
    //     detailsPull = detail.map(item => {
    //         return item
    //     })
    // }
    function calculateAge(dateOfBirth: string) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // @ts-ignore
    const details = datas.map(data => {
        if (data.id === currentID) {
            //let vote_average = data.vote_average.toFixed(1);
            return (
                <div className='.content-wrapper' key={currentID}>
                    <div className="modal-heading">
                        <div className='mr-5'>{data.name}</div>
                        <div className='close-btn cursor-pointer' onClick={closeModal}>X</div>
                    </div>
                    <div className='modal-body'>
                        <div className=''>
                            <div className='movie-description text-left'>
                                <h1><span className='font-bold'>Known for:</span> {data.known_for_department}</h1>
                                {
                                    detail.birthday &&
                                    <p>
                                        <span className='font-bold'>Born: </span>
                                        {`${detail.birthday} 
                                          ${detail.deathday === null ? `(age ${calculateAge(detail.birthday)})` : ''}
                                            `}
                                    </p>
                                }
                                {detail.deathday && <p><span className='font-bold'>Died: </span> {detail.deathday}</p>}
                                {detail.homepage && <p><span className='font-bold'>Website: </span> {detail.homepage}</p>}
                                {detail.place_of_birth && <p><span className='font-bold'>Birth place: </span> {detail.place_of_birth}</p>}
                            </div>

                        </div>
                        <div className='bottom-part text-left'>
                            <p>
                                <span className='font-bold text-green-400'>Known for (movies): </span> {data.overview}
                            </p>
                            <div className='mt-2 mb-5 person-movie-images-container'>
                                {data.known_for?.map((known_for: any) => {
                                    return <img
                                        className='rounded-lg person-movie-images'
                                        src={`https://image.tmdb.org/t/p/original${known_for.poster_path}`} alt="movie posters"
                                    />
                                })}
                            </div>
                            {detail.biography && <p><span className='font-bold text-blue-400'>Biography: </span> {detail.biography}</p>}
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

export default ModalPeople