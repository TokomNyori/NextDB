'use client'
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Cards from "./Cards";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import Modal from "../Modal";
import Footer from "../Footer";
import Link from "next/link";
import { MdOutlineLocalMovies } from 'react-icons/md'
import { PiTelevisionSimpleBold } from 'react-icons/pi'
import ModalTwo from "../ModalTwo";
import ModalPeople from "../ModalPeople";
import { GoPeople } from "react-icons/go";

export default function MainLayoutTwo({ page_name }: { page_name: string }) {
    const [val, setVal] = useState('trending');
    const [mirrorVal, setMirrorVal] = useState('trending (people)');
    const [data, setData] = useState([]);
    const [isSticky, setIsSticky] = useState(false)
    const [loading, setLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [details, setDetails] = useState([])
    const [currentID, setCurrentID] = useState()
    const API_KEY = "88477ce165409d6acab148e6bbcff0a7"

    useEffect(() => {
        try {
            toast.promise(
                // axios.get('/api/get/', { params: { val } })
                //     .then(res => {
                //         setData(res.data)
                //         setLoading(false)
                //         scrollToTop()
                //     }),
                workingWithData(),
                {
                    loading: 'Loading...',
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
                        duration: 5000,
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
        setLoading(true)
        console.log(currentID)
        // axios.get('/api/get/', { params: { currentID, val } })
        //     .then(res => {
        //         setGenres(res.data)
        //         setLoading(false)
        //     })
        fetch(`https://api.themoviedb.org/3/person/${currentID}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setDetails(res)
                setLoading(false)
            })
    }, [currentID])

    console.log(details)

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

    })

    async function workingWithData() {
        setLoading(true)
        if (val === 'popular') {
            //'https://api.themoviedb.org/3/person/popular?
            const result = await fetch(`https://api.themoviedb.org/3/person/${val}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.results)
                    setLoading(false)
                    scrollToTop()
                })
        } else {
            const result = await fetch(`https://api.themoviedb.org/3/${val}/person/day?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.results)
                    setLoading(false)
                    scrollToTop()
                })
        }
    }

    function changeCategory(event: any) {
        const eVal = event.target.value
        setVal(eVal)
        if (eVal === 'trending') {
            setMirrorVal('trending (people)')
        } else {
            setMirrorVal(eVal + ' (people)')
        }
    }

    function changeModal(event: any, id: any) {
        setModalState(true)
        setCurrentID(id)
    }

    function closeModal(event: any) {
        setModalState(false)
    }

    function tabLoading(e: any) {
        const clickedLink = e.currentTarget; // Get the clicked link element
        const linkId = clickedLink.id; // Get the id attribute of the clicked link
        if (page_name === 'people' && linkId === 'linkPeople') {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }

    const scrollToTop = () => {
        const duration = 1000; // Adjust the duration of the scroll animation
        const startTime = performance.now();
        const startPosition = window.pageYOffset;

        const easingFunction = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFunction(progress);
            const newPosition = startPosition + (0 - startPosition) * easedProgress;

            window.scrollTo(0, newPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };



    const movieData = data.map(item => {
        return (
            <Cards
                id={item['id']}
                key={item['id']}
                title={item['name']}
                poster_path={item['profile_path']}
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
            <div className="grid grid-cols-3 gap-4">
                <Link
                    className={`${page_name === 'movies' && 'border-b-[1px] border-slate-300'} text-center
                                  flex justify-center items-center gap-1 px-2 py-1
                                hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/' onClick={tabLoading} id="linkMovie">
                    <MdOutlineLocalMovies className='text-green-400' />
                    <div>Movies</div>
                </Link>
                <Link
                    className={`${page_name === 'tv-series' && 'border-b-[1px] border-slate-300'} text-center
                                    flex justify-center items-center gap-1 px-2 py-1
                                  hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/tv-series' onClick={tabLoading} id="linkTv" >
                    <PiTelevisionSimpleBold className='text-red-400' />
                    <div>TV Series</div>
                </Link>
                <Link
                    className={`${page_name === 'people' && 'border-b-[1px] border-slate-300'} text-center
                                    flex justify-center items-center gap-1 px-2 py-1
                                  hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/people' onClick={tabLoading} id="linkPeople" >
                    <GoPeople className='text-blue-400 text-lg' />
                    <div>People</div>
                </Link>
            </div>
            <div className={`sorting-nav my-6 ml-2 flex gap-2 items-center ${isSticky ? 'fixed-nav' : ''}`}>
                <h1>Sort:</h1>
                <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                    name="categories" id="" value={val} onChange={changeCategory}>
                    <option value="trending">Trending</option>
                    <option value="popular">Popular</option>
                </select>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-2 md:px-6 lg:px-12">
                {movieData}
            </div>
            <Toaster />
            <ModalPeople
                datas={data} detail={details} currentID={currentID}
                modalState={modalState} closeModal={closeModal}
                val={val} page_name={page_name}
                key={currentID}
            />
            <Footer />
        </div>
    )
}