import React from 'react';
import { Eye } from 'lucide-react';

const Hero = () => {
    return (
        <>
            {/* Top Hero Section */}
            <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#FFE8CC_0%,#FFA86F_100%)] pt-[230px] pb-0">

                {/* Text Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        जहाँ शब्द ठहर जाते हैं। / Where Words Choose to Stay
                    </h1>

                    <div className="space-y-2 text-[15px] md:text-base text-gray-800 max-w-7xl mx-auto font-medium">
                        <p>
                            Hindi साहित्य का एक curated संसार - जहाँ Premchand की गली, Nirala की कविता, और आज के नए स्वर एक ही छत तले मिलते हैं। पढ़ना यहाँ एक ritual है, जल्दी नहीं।
                        </p>
                        <p>
                            "A curated world of Hindi literature - where Premchand's streets, Nirala's verse, and new contemporary voices meet under one roof. Reading here is a ritual, not a rush."
                        </p>
                    </div>

                    <button className="mt-8 bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-3 font-medium transition-transform hover:scale-105">
                        संग्रह देखें / Explore the Collection
                        <img
                            src="/images/icons/eyewhite.svg"
                            alt="eye icon"
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                {/* SVG Books Tree Container */}
                <div className="relative z-10 max-w-[1200px] mx-auto mt-16 px-4 flex justify-center -translate-y-10 md:-translate-y-14 lg:-translate-y-20">
                    <img
                        src="/images/hero/bookstree.svg"
                        alt="Books Tree Collection"
                        className="w-full h-auto object-contain max-w-full drop-shadow-xl"
                    />
                </div>

                {/* Bottom Wave/Curve Transition */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-0">
                    <svg
                        className="relative block w-full h-[120px] md:h-[160px] lg:h-[200px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,80 C150,40 350,120 600,90 C850,60 1000,120 1200,80 L1200,120 L0,120 Z"
                            className="fill-[#f3efe9]" // Matches the bottom section color exactly
                        />
                    </svg>
                </div>

            </section>

            {/* Bottom Features Section */}
            <section className="w-full bg-[#f3efe9] py-16 md:py-24 border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

                    {/* Flex Container for Columns */}
                    <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-0">

                        {/* Block 1 */}
                        <div className="flex-1 flex items-start gap-5 px-4 xl:px-8">
                            <img
                                src="/images/icons/heroicon1.svg"
                                alt="Read slowly"
                                className="w-14 lg:w-16 h-auto shrink-0"
                            />
                            <div>
                                <h3 className="text-[16px] lg:text-[18px] font-bold text-black mb-3 leading-snug">
                                    धीरे पढ़ो / <br /> Read slowly
                                </h3>
                                <p className="text-[14px] lg:text-[15px] text-gray-800 leading-relaxed">
                                    No algorithm. No bestseller pressure. Just books chosen by people who love Hindi literature curated with care, not clicks.
                                </p>
                            </div>
                        </div>

                        {/* Divider 1 */}
                        <div className="hidden md:block w-px bg-gray-300 my-4"></div>

                        {/* Block 2 */}
                        <div className="flex-1 flex items-start gap-5 px-4 xl:px-8">
                            <img
                                src="/images/icons/heroicon2.svg"
                                alt="Old roots, new voices"
                                className="w-14 lg:w-16 h-auto shrink-0"
                            />
                            <div>
                                <h3 className="text-[16px] lg:text-[18px] font-bold text-black mb-3 leading-snug">
                                    क्लासिक से contemporary / <br /> Old roots, new voices.
                                </h3>
                                <p className="text-[14px] lg:text-[15px] text-gray-800 leading-relaxed">
                                    Munshi Premchand to Manav Kaul the full arc of Hindi साहित्य, in one place, without the chaos of a search bar.
                                </p>
                            </div>
                        </div>

                        {/* Divider 2 */}
                        <div className="hidden md:block w-px bg-gray-300 my-4"></div>

                        {/* Block 3 */}
                        <div className="flex-1 flex items-start gap-5 px-4 xl:px-8">
                            <img
                                src="/images/icons/heroicon3.svg"
                                alt="Every book has something to say"
                                className="w-14 lg:w-16 h-auto shrink-0"
                            />
                            <div>
                                <h3 className="text-[16px] lg:text-[18px] font-bold text-black mb-3 leading-snug">
                                    हर किताब की अपनी बात / <br /> Every book has something to say
                                </h3>
                                <p className="text-[14px] lg:text-[15px] text-gray-800 leading-relaxed">
                                    We write about each book honestly why it matters, who it's for, what it asks of you. No star ratings. No hollow blurbs.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;