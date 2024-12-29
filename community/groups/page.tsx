"use client";

import { Tilt } from "react-tilt";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import culture from "@/assets/culture.webp";
import education from "@/assets/education.png";
import employment from "@/assets/employment.jpg";
import family from "@/assets/family.jpg";
import geographical from "@/assets/geographical.png";
import socioeconomic from "@/assets/socioeconomic.jpg";
import Link from "next/link";

const defaultOptions = {
  reverse: false,
  max: 5,
  perspective: 500,
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const Match = () => {
  return (
    <div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-12 max-w-7xl mx-auto">
        <Tilt options={defaultOptions}>
          <div className="flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Socioeconomic</CardTitle>
                <CardDescription className="text-center">
                  Low-income/Underprivileged: Individuals or families with
                  limited financial resources and access to basic needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Image
                  src={socioeconomic}
                  alt="eco"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </CardContent>
              <CardContent className="flex flex-col items-center">
                <Link href={"/community/groups/1"}>
                  <Button>Join</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Tilt>
        <Tilt options={defaultOptions}>
          <div className="flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Educational</CardTitle>
                <CardDescription className="text-center">
                  Limited Formal Education: Individuals who did not have the
                  opportunity to complete high school or basic education.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Image
                  src={education}
                  alt="eco"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </CardContent>
              <CardContent className="flex flex-col items-center">
                <Link href={"/community/groups/2"}>
                  <Button>Join</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Tilt>
        <Tilt options={defaultOptions}>
          <div className="flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Employment</CardTitle>
                <CardDescription className="text-center">
                  Unemployed: Individuals without a job who are actively seeking
                  work or facing employment barriers.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Image
                  src={employment}
                  alt="eco"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </CardContent>
              <CardContent className="flex flex-col items-center">
                <Link href={"/community/groups/3"}>
                  <Button>Join</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Tilt>
        <Tilt options={defaultOptions}>
          <div className="flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Family</CardTitle>
                <CardDescription className="text-center">
                  Single-parent Household: Individuals raised by one parent,
                  which may affect financial and emotional support.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Image
                  src={family}
                  alt="eco"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </CardContent>
              <CardContent className="flex flex-col items-center">
                <Link href={"/community/groups/4"}>
                  <Button>Join</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Tilt>
        <Tilt options={defaultOptions}>
          <div className="flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Cultural and Ethnic</CardTitle>
                <CardDescription className="text-center">
                  Minority Ethnic Group: Individuals from racial or ethnic
                  groups that are underrepresented or face systemic barriers in
                  the community.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Image
                  src={culture}
                  alt="eco"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </CardContent>
              <CardContent className="flex flex-col items-center">
                <Link href={"/community/groups/5"}>
                  <Button>Join</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Tilt>
        <Tilt options={defaultOptions}>
          <div className="flex items-center justify-center">
            <Card className="w-96">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Geographical</CardTitle>
                <CardDescription className="text-center">
                  Disadvantaged Neighborhood: Individuals from areas with high
                  crime rates, limited job opportunities, and poor access to
                  educational and recreational activities.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Image
                  src={geographical}
                  alt="eco"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </CardContent>
              <CardContent className="flex flex-col items-center">
                <Link href={"/community/groups/6"}>
                  <Button>Join</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default Match;
