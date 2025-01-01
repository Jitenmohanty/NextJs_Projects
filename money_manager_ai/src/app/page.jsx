import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {featuresData, howItWorksData, statsData} from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="">
        <HeroSection/>
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => <div className="text-center" key={index}>
            <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>)}
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything you need to manage your Finance 💸</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuresData.map((feature, index) => ( 
                  <Card key={index} className="flex items-center space-x-4 hover:shadow-xl transition duration-300">
                        <CardContent className="space-y-4 pt-4">
                          {feature.icon}
                          <h3 className="text-xl font-semibold">{feature.title}</h3>
                          <p className="text-gray-600 ">{feature.description}</p>
                        </CardContent>
                  </Card>
                )
                )}
            </div>
          </div>
        </section>
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything you need to manage your Finance 💸</h2>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                {howItWorksData.map((step, index) => ( 
                    <div className="flex items-center space-x-4" key={index}>
                      <div>{step.icon}</div>
                      <h3>{step.title}</h3>
                    </div>
                )
                )}
            </div>
          </div>
        </section>
        
    </div>
  );
}
