import '../index.css';
export default function HomePage() {
  return <main id='unique-page'>
  <section id='homeId' className='mainPageSections'>
    <div id='intro'>
      <div id='homePageIntro'>
        <h1>WELCOME</h1>
        <p id='homePageP'>LEARN TO CODE AND CHANGE THE WORLD</p>
      </div>
      <figure className='introImgContainer'>
        <img
          id='homeImg'
          src='https://bootcamprankings.com/wp-content/uploads/2021/11/Best-Bootcamps-for-High-School-Students-in-2022.jpeg'
          alt='students on their computers coding together'
        />
      </figure>
    </div>
  </section>
  <section className='mainPageSections sectionTwo'>
    <h2 >Why Script Academy</h2>
    <div className='infoSection'>
    <figure className='infoSectionImg'>
      <img
        id='homeImg'
        src='https://cdn7.dissolve.com/p/D538_463_079/D538_463_079_1200.jpg'
        alt='students on their computers and teacher standing smiling'
      />
    </figure>
    <p id='sectionTwoTitle'>
    At Script Academy, we are dedicated to empowering high school students from underrepresented communities with the skills and opportunities they need to thrive in the rapidly evolving tech industry. Through innovative coding courses and work-based learning programs, we bridge the gap between education and employment, providing young people with the tools to become experienced full-stack developers and create transformative pathways to success. Our programs embrace the '50% love and 50% push' philosophy, fostering a supportive learning environment that combines encouragement and challenge to maximize student growth. 
    </p>
    </div>
  </section>
  <a className='active btt' href="#homeId"><p>Back to Top ^</p></a>
  </main>
  
};
