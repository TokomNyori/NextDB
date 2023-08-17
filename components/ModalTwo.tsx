import { FaInstagram } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'

interface ModalTwoProps {
    greet: boolean,
    greetings: any,
}

const ModalTwo: React.FC<ModalTwoProps> = ({ greet, greetings }) => {
    return (
        <div
            className={`modal-blur inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center
                        ${greet ? "fix-modal" : "hidden"} flex-wrap`}
        >
            <div className="modal rounded-lg py-6 pb-0 pt-8" >
                <div className='.content-wrapper'>
                    <div className="modal-heading">
                        <div className='mr-5'></div>
                        <div className='close-btn cursor-pointer' onClick={greetings}>X</div>
                    </div>
                    <div className='modal-body'>
                        <div className='details'>
                            <div className='movie-description text-left'>
                                <h1 className='text-red-400 font-bold'>I am Tokom,</h1>
                                <p>a mobile and web app developer with a passion for nutrition science and economics.</p>
                            </div>
                            <div className='modal-image-cover mb-2'>
                                <img
                                    className='modal-image h-full'
                                    src="/images/Mee.jpg" alt=""
                                />
                                <a
                                    className='insta-link text-md flex justify-end items-center gap-1 cursor-pointer mr-1'
                                    target='_blank'
                                    href="https://www.instagram.com/geekpie.in/">
                                    <span className='text-sm'>Follow -&gt; </span>
                                    <FaInstagram className='text-pink-600 text-md shadow-lg' />
                                </a>
                            </div>
                        </div>
                        <div className='bottom-part text-left mb-0 mt-1'>
                            <p>
                                <span className='font-bold text-green-300'>This web app </span>
                                is developed using Next.js, TypeScript, Tailwind CSS, Axios,
                                and the TMDB API.
                                <a href="https://github.com/TokomNyori/NextDB" target='_blank'>
                                    <span className='text-sm'> Github Repo -&gt; </span>
                                    <span><AiFillGithub className='text-white text-xl shadow-lg inline' /></span>
                                </a>
                            </p>
                            <div className='mb-0 mt-3'>
                                <img
                                    src="/images/Nextjs-logo.png" alt=""
                                />
                            </div>
                            <div className='mt-4 mb-0'>
                                <img
                                    src="/images/Tailwind-logo.png" alt=""
                                />
                            </div>
                            <div className='mt-4 mb-0 flex justify-between gap-4'>
                                <div className=''>
                                    <img
                                        src="/images/Typescript.png" alt=""
                                        height={100} width={200}
                                    />
                                </div>
                                <div className=''>
                                    <img
                                        src="/images/Tmdb.png" alt=""
                                        height={100} width={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTwo