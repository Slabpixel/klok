import Hero from "@/components/section/hero";
import Highlight from "@/components/section/highlight";
import Experiment from "@/components/section/experiment";
import CaseStudy from "@/components/section/case-study";
import Testimonial from "@/components/section/testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlight />
      <Experiment />
      <CaseStudy />
      <Testimonial />
    </>
  );
}
