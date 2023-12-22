import avatar1 from "../../assets/defaultTrainer/trainer-1.avif";
import avatar2 from "../../assets/defaultTrainer/trainer-2.avif";
import avatar3 from "../../assets/defaultTrainer/trainer-3.avif";

const AboutUs = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Lead Developer',
            bio: 'Experienced lead developer with a passion for creating efficient and user-friendly task management solutions.',
            image: avatar1,
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'UI/UX Designer',
            bio: 'Creative UI/UX designer dedicated to crafting visually appealing and intuitive interfaces for seamless task management.',
            image: avatar2,
        },
        {
            id: 3,
            name: 'Alex Johnson',
            position: 'Product Manager',
            bio: 'Seasoned product manager committed to overseeing the development of innovative task management features that enhance productivity.',
            image: avatar3,
        },
    ];

    return (
        <div className="pt-32">
            <h1 className="text-5xl font-semibold text-blue-500 text-center my-10">About Our Task Management Platform</h1>
            <div className="mx-10 text-black">
                {/* Company Overview Section */}
                <section className="bg-gray-800 text-white py-20">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
                        <p className="text-lg">
                            Welcome to TaskMaster Co, where task management is made simple and efficient! We are a team of dedicated individuals passionate about transforming the way people organize and complete tasks. Our mission is to provide a robust task management platform that empowers individuals and teams to achieve their goals with ease.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
                        <p className="text-lg">
                            TaskMaster Co was founded in 2023 with the goal of revolutionizing task management. Inspired by the need for a user-friendly and feature-rich platform, our founder, Sazzadul Islam, envisioned a tool that would streamline the task management process for individuals and teams.
                        </p>
                        <p className="text-lg">
                            From the early days filled with brainstorming sessions to the development of cutting-edge features, our journey reflects our commitment to creating a task management solution that adapts to the evolving needs of our users.
                        </p>
                        <p className="text-lg">
                            Today, TaskMaster Co stands as a symbol of innovation, efficiency, and a commitment to helping users achieve more with their time. We are proud to be a part of your journey towards successful task management.
                        </p>
                    </div>
                </section>

                {/* Team Section */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-gray-600 mb-2">{member.position}</p>
                                    <p className="text-gray-800">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Our Values</h2>
                        <ul className="list-disc list-inside">
                            <li>
                                <span className="font-bold">User-Centric Design:</span> We prioritize creating a platform that is intuitive, user-friendly, and meets the unique needs of our users.
                            </li>
                            <li>
                                <span className="font-bold">Continuous Innovation:</span> Our commitment to innovation drives us to regularly update and enhance our platform with new features and improvements.
                            </li>
                            <li>
                                <span className="font-bold">Collaboration:</span> We believe in the power of collaboration and strive to provide tools that foster effective teamwork and communication.
                            </li>
                            <li>
                                <span className="font-bold">Efficiency:</span> TaskMaster Co is dedicated to helping users achieve maximum efficiency in their task management processes, saving time and resources.
                            </li>
                            <li>
                                <span className="font-bold">Reliability:</span> Users can rely on TaskMaster Co as a trustworthy and dependable tool for organizing and managing tasks.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gray-800 text-white py-20">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-lg mb-8">
                            Have questions or want to learn more about TaskMaster Co? Contact us at{' '}
                            <a href="psazzadul@gmail.com" className="underline">
                                psazzadul@gmail.com.com
                            </a>{' '}
                            or call us at{' '}
                            <a href="tel:+8801917335945" className="underline">
                                +8801917335945
                            </a>
                            .
                        </p>
                        {/* You can add a contact form or other relevant contact information here */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
