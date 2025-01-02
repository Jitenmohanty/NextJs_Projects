import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {featuresData, howItWorksData, statsData, testimonialsData} from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
          {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with Welth
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
