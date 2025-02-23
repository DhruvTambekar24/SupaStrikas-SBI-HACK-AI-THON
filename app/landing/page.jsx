"use client";
import { BackgroundBeams } from '../../components/ui/background-beams';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Activity, Brain, Shield, Star, Users, Menu, X } from 'lucide-react';
import hero from '../../components/assets/hero.png'
import Link from 'next/link';
import logo from "../../components/assets/logo.png"
import Loader from "../../components/Loader"
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from '../../components/ui/google-gemini-effect';
import { WavyBackground } from '../../components/ui/wavy-background';
import { WordRotate } from '../../components/magicui/word-rotate';
import { PulsatingButton } from '../../components/magicui/pulsating-button';
import { Marquee } from '../../components/magicui/marquee';
import { cn } from "@/lib/utils";
import { Vortex } from '../../components/ui/vortex';
import mail from '../../components/assets/mail.png'
import linkedin from '../../components/assets/linkedin.png'
import github from '../../components/assets/github.png'
import location from '../../components/assets/location.png'
import contact from '../../components/assets/contact.png'
import { useTheme } from 'next-themes'
import { MagicCard } from '../../components/magicui/magic-card';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
const LandingPage = () => {
  // Previous state management code remains the same
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const ref = React.useRef(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };


  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-200 bg-transparent backdrop-blur-lg hover:bg-gray-950/[.2]",
          // dark styles
          "dark:border-gray-200 dark:bg-transparent backdrop-blur-lg dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row items-center gap-2 ">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-gray-400">
              {name}
            </figcaption>
            <p className="text-xs font-medium text-gray-300">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm text-gray-200">{body}</blockquote>
      </figure>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Previous data arrays remain the same
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-[#4A90E2]" />,
      title: "AI Diagnostics",
      description: "Advanced machine learning algorithms providing accurate medical diagnoses and predictions"
    },
    {
      icon: <Activity className="w-8 h-8 text-[#4A90E2]" />,
      title: "Real-time Monitoring",
      description: "Continuous patient monitoring with instant alerts and predictive analytics"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#4A90E2]" />,
      title: "Secure Platform",
      description: "HIPAA-compliant security measures protecting sensitive healthcare data"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief of Medicine",
      content: "This AI platform has revolutionized our diagnostic process, reducing time to treatment by 45%."
    },
    {
      name: "James Wilson",
      role: "Hospital Administrator",
      content: "The efficiency gains we've seen are remarkable. Patient satisfaction has increased significantly."
    }
  ];

  const navLinks = ['Features', 'Testimonials', 'Contact'];

  const handleNavClick = (link) => {
    setActiveLink(link);
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B5179E]/70 to-[#240046] relative">

      {/* Floating Header - Now with gradient background when scrolled */}
      <header
        className={`fixed w-fit motion-preset-slide-down-lg motion-duration-500 delay-200 flex left-0 right-0 justify-center items-center z-[1000] transition-all duration-300 mx-auto mt-5 rounded-full 
        ${isScrolled
            ? 'bg-transparent backdrop-blur-xl border border-purple-200 drop-shadow-2xl'
            : 'bg-transparent backdrop-blur-xl border border-white drop-shadow-2xl'
          }
        shadow-[inset_0px_0px_10px_rgba(232,157,255,0.5)] before:content-[''] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0px_0px_15px_rgba(232,157,255,0.5)]`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-44">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                width={50}
                height={50}
              />
              <span className="ml-2 text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-950  to-purple-800 bg-clip-text text-transparent hover:bg-white">
                PACES
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-2 z-[100]">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => handleNavClick(link)}
                  className={`text-lg tracking-tight font-bold transition-all duration-500  px-4 py-2 rounded-full
                    ${activeLink === link
                      ? 'bg-gradient-to-r  to-purple-800 text-white transition-all  drop-shadow-2xl'
                      : 'text-gray-500 hover:text-white'
                    }`}
                >
                  {link}
                </a>
              ))}
              <PulsatingButton
              onClick={() => router.push('/cards')}
              ><h3 className='text-white tracking-tighter text-xl font-bold'>Get Started</h3></PulsatingButton>
            </nav>


            <button
              className="md:hidden text-[#2D3748] z-[900]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 ">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block py-2 text-[#2D3748] hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <PulsatingButton
               onClick={() => router.push('/cards')}
               ><h3 className='text-white tracking-tighter text-xl font-bold'>Get Started</h3></PulsatingButton>
            </nav>
          )}
        </div>
      </header>
      <div className="min-h-screen ">
        {/* Hero Section - Enhanced with gradient */}
        {/* <WavyBackground className=" mx-auto "> */}
        <section className="relative min-h-screen flex items-center   overflow-hidden ">
          <div className="absolute inset-0 bg-gradient-to-br  from-[#4A90E2]/10 to-[#50E3C2]/10" />
          <div className="container mx-auto px-4 lg:px-8 relative z-[100]">
            <div className="flex flex-col-reverse lg:flex-row justify-between lg:justify-end pt-16 lg:pt-12 px-12 gap-2 lg:gap-12 items-center min-h-screen">
              <div className="lg:space-y-6 lg:pb-6 pb-6">

                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter bg-gradient-to-r  to-purple-800 bg-clip-text text-transparent motion-preset-expand motion-duration-500 delay-200 capitalize" >
                Personalized Ai customer engagement system
                </h1>
                <h2 className='text-neutral-800 text-lg flex flex-row justify-start items-center gap-2 motion-preset-slide-right-md motion-duration-500 delay-200'>
                  Revolutionizing the insurance industry with AI-driven  <WordRotate
                    className=" font-bold italic underline"
                    words={["Risk Assessment", "Predictive Analysis", "Fraud Detection"]}
                  />
                </h2>

                <PulsatingButton
                 onClick={() => router.push('/cards')}
                 ><h3 className='text-white tracking-tighter text-2xl font-bold motion-preset-pop motion-duration-500 delay-200'>Get Started</h3></PulsatingButton>
              </div>
              <div className="relative pt-10 z-[1000] overflow-hidden">
                <div className="bg lg:h-[80vh] h-[90vh] w-[90vw] lg:w-[40vw] bg-[#722A78] absolute -bottom-32 -right-14 z-0 rounded-full motion-preset-slide-left-lg delay-300 duration-900"></div>
                <Image
                  src={hero}
                  alt="Healthcare Innovation"
                  className="lg:w-[73vw] lg:h-[50vh] w-[90vw] h-[54vh] z-10 relative motion-preset-slide-left-lg delay-200 duration-1000"
                />
              </div>

            </div>
          </div>
          <BackgroundBeams />
        </section>
        {/* </WavyBackground> */}
        {/* Features Section - With subtle gradient */}
        <motion.section
          id="features"
          className="py-10 px-24 rounded-t-3xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-center text-gray-300 mb-16">
              Key Features
            </h2>
            <div className="flex flex-col justify-evenly flex-wrap items-center lg:flex-row gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <MagicCard
                    className="cursor-pointer flex-col w-80 h-72 p-4 items-center justify-center whitespace-nowrap backdrop-blur-lg rounded-xl border-2 border-gray-300"
                    gradientColor={theme === "light" ? "#262626" : "#D9D9D955"}
                  >
                    <div className="mb-4 text-2xl">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-300">
                      {feature.title}
                    </h3>
                    <p className="text-black font-semibold text-wrap text-md">
                      {feature.description}
                    </p>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section - With enhanced gradient */}
        {/* <WavyBackground className=" mx-auto "> */}\
        <Vortex
          backgroundColor="transparent"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4"
        >

          <motion.section
            id="solutions"
            className="py-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Ensures animation triggers when 20% of the section is visible
          >
            <motion.div
              className="container flex flex-col justify-center items-center px-0 lg:px-24 bg-transparent backdrop-blur-xl py-8 rounded-2xl border-2 border-gray-300"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="text-3xl lg:text-4xl font-bold text-gray-300 mb-6"
                variants={sectionVariants}
              >
                Ready to Transform Your Practice?
              </motion.h2>

              <motion.p
                className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
                variants={sectionVariants}
              >
                Join thousands of insurance solutions already using our AI-powered solutions
              </motion.p>

              <motion.div variants={sectionVariants}>
                <PulsatingButton
                 onClick={() => router.push('/cards')}
                 >
                  <h3 className="text-white tracking-tighter text-2xl font-bold">
                    Get Started
                  </h3>
                </PulsatingButton>
              </motion.div>
            </motion.div>
          </motion.section>
        </Vortex>

        {/* </WavyBackground> */}

        {/* Testimonials Section - With subtle gradient */}
        <Vortex
          backgroundColor="transparent"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4"
        >
          <motion.section
            id="testimonials"
            className="py-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is visible
          >
            <motion.div
              className="container px-4 lg:px-24"
              variants={sectionVariants}
            >
              <motion.h2
                className="text-3xl lg:text-4xl font-bold text-center text-gray-300 mb-16"
                variants={sectionVariants}
              >
                What Our Users Say...
              </motion.h2>

              <motion.div
                className="flex flex-col justify-center items-center overflow-hidden gap-8"
                variants={sectionVariants}
              >
                <Marquee pauseOnHover className="[--duration:20s]">
                  {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>

                <Marquee reverse pauseOnHover className="[--duration:20s]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>

                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"
                  variants={sectionVariants}
                />
                <motion.div
                  className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"
                  variants={sectionVariants}
                />
              </motion.div>
            </motion.div>
          </motion.section>

        </Vortex>

        {/* Footer - With gradient */}
        <WavyBackground className=" mx-auto ">
        </WavyBackground>
        <footer id="contact" className=" text-gray-500 pt-6 pb-5 border-t-2 rounded-t-3xl">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8">
              <div className='text-gray-300'>
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Contact Us </h3>
                <p className='flex justify-start my-1 gap-2 items-center'><Image
                  src={mail}
                  alt="Mail"
                  width={20}
                  height={20}
                />: d.tambekar24@gmail.com</p>
                <Link href={"https://www.linkedin.com/in/dhruv-tambekar-190a1728a/"} className='flex justify-start my-1 gap-2 items-center'><Image
                  src={linkedin}
                  alt="linkedin"
                  width={20}
                  height={20}
                /> : (555) 123-4567</Link>
                <Link href={"http://github.com/DhruvTambekar24/"} className='flex justify-start my-1 gap-2 items-center'><Image
                  src={github}
                  alt="github"
                  width={20}
                  height={20}
                /> : (555) 123-4567</Link>
              </div>
              <div className='text-gray-300'>
                <h3 className="text-xl font-semibold mb-4 text-gray-200 flex justify-start items-center gap-2">
                  <Image
                    src={location}
                    alt="location"
                    width={20}
                    height={20}
                  />
                  Location</h3>
                <p>Nagpur - 400224</p>
                <p>Maharashtra</p>
                <p className='mb-2'>India</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Follow Us</h3>
                <div className="flex space-x-4">
                  <Users className="w-6 h-6" />
                  <Activity className="w-6 h-6" />
                  <Brain className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm pt-4 border-t border-gray-700 text-center text-gray-200 italic">
              <p>&copy; 2025 PACES - All rights reserved ~ Supa Strikas</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;