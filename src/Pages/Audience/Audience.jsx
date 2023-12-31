import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation'

import img1 from '../../assets/devoloper.png';
import img2 from '../../assets/professionals.png';
import img3 from '../../assets/banker.png';
import img4 from '../../assets/student.png';
import img5 from '../../assets/entrepreneur.png';
import img6 from '../../assets/Designers.png';
import img7 from '../../assets/Healthcare.png';
import img8 from '../../assets/Freelancers.png';
import img9 from '../../assets/teacher.png';
import img10 from '../../assets/Researchers.png';


const Audience = () => {
    const targetAudiences = [
        {
            title: 'Developers',
            description: 'Explore powerful tools and resources for seamless development.',
            img: img1,
        },
        {
            title: 'Corporate Professionals',
            description: 'Enhance productivity and collaboration within your corporate environment.',
            img: img2,
        },
        {
            title: 'Bankers',
            description: 'Access financial tools and stay updated on industry trends.',
            img: img3,
        },
        {
            title: 'Students',
            description: 'Find educational materials and tools to support your learning journey.',
            img: img4,
        },
        {
            title: 'Entrepreneurs',
            description: 'Discover resources to help you start and grow your own business.',
            img: img5,
        },
        {
            title: 'Designers',
            description: 'Access design tools and inspiration to fuel your creative projects.',
            img: img6,
        },
        {
            title: 'Healthcare Professionals',
            description: 'Stay informed on healthcare innovations and access useful tools.',
            img: img7,
        },
        {
            title: 'Freelancers',
            description: 'Manage your freelance projects more efficiently with dedicated tools.',
            img: img8,
        },
        {
            title: 'Teachers and Educators',
            description: 'Find resources to enhance your teaching methods and engage students.',
            img: img9,
        },
        {
            title: 'Researchers',
            description: 'Access data analysis tools and stay updated on research trends.',
            img: img10,
        },
    ];


    const swiperParams = {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
            clickable: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    };

    return (
        <div className="pt-36">
            <div className="mx-auto text-center pb-5">
                <h2 className="text-5xl font-bold mb-5 text-blue-500">Who Can Benefit?</h2>
                <Swiper {...swiperParams} className="mySwiper">
                    {targetAudiences.map((audience, index) => (
                        <SwiperSlide key={index} className="card w-24 flex flex-col bg-blue-200 p-10">
                            <img className="w-20 mx-auto" src={audience.img} alt="" />
                            <h3 className="text-xl font-semibold mb-3 text-blue-700">{audience.title}</h3>
                            <p className="text-black">{audience.description}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Audience;
