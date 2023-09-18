import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/marci.png" alt="An image showing Marci" width={300} height={300} />
      </div>
      <h1>Hi, I'm Marci</h1>
      <p>
        I blog about web development - especially frontend frameworks and libraries like Next.js and React.
      </p>
    </section>
  );
}

export default Hero;