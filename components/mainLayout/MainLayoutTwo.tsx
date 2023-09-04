'use client'
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Cards from "./Cards";
import { nanoid } from "nanoid"
import ScaleLoader from "react-spinners/ScaleLoader";
import Footer from "../Footer";
import Link from "next/link";
import { MdOutlineLocalMovies } from 'react-icons/md'
import { PiTelevisionSimpleBold } from 'react-icons/pi'
import ModalAnime from "../modals/ModalAnime";
import { FaSuperpowers } from 'react-icons/fa'
import CardSkeleton from "../skeletons/CardSkeleton";
import { getData } from "@/app/libs/getData";
import { getCategory } from "@/app/libs/getCategory";
import Sorting from "./Sorting";
import scrollToTop from "@/app/libs/scrollToTop";

export default function MainLayoutTwo({ page_name }: { page_name: string }) {
    const [val, setVal] = useState('current season');
    const [mirrorVal, setMirrorVal] = useState('Current Season');
    const [data, setData] = useState([]);
    const [isSticky, setIsSticky] = useState(false)
    const [loading, setLoading] = useState(false)
    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [details, setDetails] = useState([])
    const [currentID, setCurrentID] = useState()
    const youtubeRef = useRef(null);
    const currentYear = new Date().getFullYear();
    const [pageName, setPageName] = useState(page_name)

    useEffect(() => {
        try {
            toast.promise(
                workingWithData(),
                {
                    loading: 'Unlocking the Anime Vault...',
                    success: <b className="capitalize">{mirrorVal}</b>,
                    error: <b>Server Error: 🥺 Please refresh the page and try again.</b>,
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#1D202A',
                        color: '#CBD5E1',
                        zIndex: 100,
                    },
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 6000,
                    },
                }
            );
        } catch (error: any) {
            toast.error("This didn't work.", {
                duration: 2000,
            })
        }
    }, [val])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 100; // Adjust this value as needed

            if (scrollTop > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])

    async function workingWithData() {
        setSkeletonLoading(true)
        const response: any = await getData({ val: val, pageName: pageName, currentYear: currentYear })
        setData(response)
        setSkeletonLoading(false)
        scrollToTop()
    }

    function changeCategory(event: any) {
        const eVal = event.target.value
        setVal(eVal)
        const category = getCategory({ targetValue: eVal, pageName: pageName, currentYear: currentYear })
        setMirrorVal(category)
    }

    function changeModal(event: any, id: any) {
        setCurrentID(id)
        setModalState(true)
    }

    function closeModal(event: any) {
        setModalState(false)
        if (youtubeRef.current) {
            // @ts-ignore
            youtubeRef.current.getInternalPlayer().pauseVideo();
        }
    }

    function tabLoading(e: any) {
        const clickedLink = e.currentTarget; // Get the clicked link element
        const linkId = clickedLink.id; // Get the id attribute of the clicked link
        // This prevents loader from loading if the button for same page is Clicked
        if (page_name === 'anime' && linkId === 'linkAnime') {
            setSkeletonLoading(false)
        } else {
            setSkeletonLoading(true)
        }

        // Changes the page name
        if (linkId === 'linkMovie') {
            setPageName('movies')
        }

        if (linkId === 'linkTv') {
            setPageName('tv-series')
        }

        if (linkId === 'linkAnime') {
            setPageName('anime')
        }
    }

    let cardSkeleton: any = [];
    for (let i = 0; i < 20; i++) {
        cardSkeleton.push(<CardSkeleton id={nanoid()} />)
    }

    const movieData = data.map(item => {
        return (
            <Cards
                page_name={pageName}
                id={item['mal_id']}
                key={item['mal_id']}
                title={val === 'characters' ? item['name'] : item['title']}
                poster_path={item['images']}
                changeModal={changeModal}
            />
        )
    })

    return (
        <div className="flex flex-col justify-center items-center">
            {
                loading &&
                <div className='modal-blur inset-0 bg-black bg-opacity-30
                        flex justify-center items-center fixed flex-wrap transition duration-150 ease-out z-50'>
                    <ScaleLoader
                        color={"#1FDF64"}
                        loading={loading}
                        // @ts-ignore
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
            {
                skeletonLoading &&
                <div className='modal-blur inset-0 bg-black bg-opacity-20
                        flex justify-center items-center fixed flex-wrap transition duration-150 ease-out z-50'>
                    <ScaleLoader
                        color={"#1FDF64"}
                        loading={loading}
                        // @ts-ignore
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
            <div className="grid grid-cols-3 gap-3 md:gap-4">
                <Link
                    className={`${pageName === 'movies' && 'border-b-[1px] border-slate-300'} text-center
                                  flex justify-center items-center gap-1 px-2 py-1
                                hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/' onClick={tabLoading} id="linkMovie">
                    <MdOutlineLocalMovies className='text-green-400' />
                    <div>Movies</div>
                </Link>
                <Link
                    className={`${pageName === 'tv-series' && 'border-b-[1px] border-slate-300'} text-center
                                    flex justify-center items-center gap-1 px-2 py-1
                                  hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/tv-series' onClick={tabLoading} id="linkTv" >
                    <PiTelevisionSimpleBold className='text-red-400' />
                    <div>TV Series</div>
                </Link>
                <Link
                    className={`${pageName === 'anime' && 'border-b-[1px] border-slate-300'} text-center
                                    flex justify-center items-center gap-1 px-2 py-1
                                  hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/anime' onClick={tabLoading} id="linkAnime" >
                    <FaSuperpowers className='text-blue-400' />
                    <div>Anime</div>
                </Link>
            </div>
            <Sorting
                val={val} pageName={pageName} changeCategory={changeCategory} isSticky={isSticky} currentYear={currentYear}
            />
            <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 px-2 md:px-6 lg:px-12
                            ${skeletonLoading && 'mt-2'}`}>
                {skeletonLoading ? cardSkeleton : movieData}
            </div>
            <Toaster />
            <ModalAnime
                ytRef={youtubeRef}
                datas={data} detail={details} currentID={currentID}
                modalState={modalState} closeModal={closeModal}
                val={val} page_name={pageName}
                key={currentID}
            />
            <Footer />
        </div>
    )
}