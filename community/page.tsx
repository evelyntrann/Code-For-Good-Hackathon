"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleArrowRight, Files, Settings } from "lucide-react";
import { Tilt } from "react-tilt";
import Image from "next/image";
import Link from "next/link";
import Match from "@/assets/match.png";
import Friends from "@/assets/friends.png";

const defaultOptions = {
  reverse: true,
  max: 5,
  perspective: 500,
  scale: 1.1,
  speed: 900,
  transition: false,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const About1 = () => {
  return (
    <section className="mt-20 mx-auto flex max-w-6xl items-center justify-center px-4 lg:px-8 ">
      <div className="container flex flex-col gap-12">
        <div className="flex flex-col gap-7">
          <h1 className=" font-semibold text-4xl">
            Connect, Support, and Grow Together
          </h1>
          <p className="max-w-xl text-lg">
            Our community thrives on shared experiences. Engage directly with
            alumni and mentors who have overcome similar barriers through our
            messaging or join our discussion board to share ideas and support.
          </p>
        </div>
        <div className="grid gap-2 grid-cols-2">
          <Tilt options={defaultOptions}>
            <div className="flex items-center justify-center">
              <Card className="w-96">
                <CardHeader className="flex flex-col items-center">
                  <CardTitle className="text-2xl">
                    Connect With Alumni
                  </CardTitle>
                  <CardDescription className="text-center">
                    Connect with Alumni Share experiences with alumni who have
                    overcome challenges and achieved success.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Image
                    src={Match}
                    alt="eco"
                    width={250}
                    height={250}
                    className="rounded-lg"
                  />
                </CardContent>
                <CardContent className="flex flex-col items-center">
                  <Link href={"/community/match"}>
                    <Button>Find a Match</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </Tilt>
          <div className="flex  rounded-2xl ">
            <Tilt options={defaultOptions}>
              <div className="flex items-center justify-center">
                <Card className="w-96">
                  <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-2xl">
                      Peer Support Groups
                    </CardTitle>
                    <CardDescription className="text-center">
                      Peer Support Groups: Connect with individuals who share
                      similar experiences and challenges. Support, encourage and
                      learn from each other.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <Image
                      src={Friends}
                      alt="eco"
                      width={250}
                      height={250}
                      className="rounded-lg"
                    />
                  </CardContent>
                  <CardContent className="flex flex-col items-center">
                    <Link href={"/community/groups"}>
                      <Button>Join Groups</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </Tilt>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Empowering Individuals to Rebuild Careers
            </h2>
            <p className="text-muted-foreground">
              We aim to help empower individuals with barriers to re-enter the
              workforce with confidence. Our platform is designed to provide
              essential resources and opportunities for long-term career
              success.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 pb-20">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Radically Inclusive Support
              </h3>
              <p className="text-muted-foreground">
                We believe there’s no room for judgement or exclusion. We are
                here to lift each other up, providing feedback, resources, and
                community to ensure that every individual has access to
                opportunities, regardless of their background.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Making Meaningful Progress
              </h3>
              <p className="text-muted-foreground">
                We focus on bold initiatives that create tangible career
                outcomes. By prioritizing what matters most, we work with our
                community to ensure that job placements and personal growth are
                always moving forward, step by step.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Empowering Through Knowledge
              </h3>
              <p className="text-muted-foreground">
                We believe that knowledge and opportunity are keys to
                empowerment. Through accessible resources, career coaching, and
                mentorship, our platform helps individuals take control of their
                career paths and confidently pursue meaningful work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;
