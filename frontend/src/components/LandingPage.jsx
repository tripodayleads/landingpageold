import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Star, MapPin, Clock, CheckCircle2, MessageCircle, Award, Headphones, Shield, TrendingDown, Sparkles } from 'lucide-react';
import { mockData } from '../utils/mock';

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    travelers: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Show popup after 2 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDestinationChange = (value) => {
    setFormData({
      ...formData,
      destination: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          travel_date: formData.travelDate,
          travelers: formData.travelers,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      setIsSubmitting(false);
      setShowThankYou(true);
      setFormData({ fullName: '', phone: '', email: '', destination: '', travelDate: '', travelers: '' });
      setTimeout(() => {
        setShowThankYou(false);
        setIsFormOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919650695999?text=Hello,%20I%20want%20to%20know%20about%20tour%20packages', '_blank');
  };

  return (
    <div className="landing-page">
      {/* WhatsApp Floating Button - Circular */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </button>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_tripform-landing/artifacts/e7qhjneg_IMG_0560%20%281%29.PNG" 
              alt="Tripoday Holidays Logo" 
              className="h-14 md:h-16"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-sm text-gray-900 bg-gray-100 px-3 py-2 rounded-lg">
              <Star className="h-4 w-4 text-[#E62020] fill-[#E62020] mr-1" />
              <span className="font-semibold">4.7</span>
              <span className="ml-1 text-gray-600">(175+)</span>
            </div>
            <Button onClick={openForm} className="bg-[#E62020] hover:bg-[#cc0e00] text-white font-semibold shadow-lg rounded-full w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center">
              <span className="hidden md:inline">Get Quote</span>
              <Sparkles className="h-5 w-5 md:hidden" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#E62020] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E62020] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge className="mb-6 bg-[#E62020] text-white hover:bg-[#cc0e00] text-sm px-4 py-2 shadow-lg">
            <Clock className="h-4 w-4 mr-2" />
            Open 24 Hours - Book Anytime!
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Best Holiday & International Tour Packages
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-[#E62020] mb-4">
            Book Your Dream Trip Today
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Affordable Honeymoon, Family & Group Tour Packages with Complete Support
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button onClick={openForm} size="lg" className="bg-[#E62020] text-white hover:bg-[#cc0e00] text-lg px-10 py-6 shadow-2xl font-bold rounded-full">
              <Sparkles className="h-5 w-5 mr-2" />
              Get Free Quote Now
            </Button>
            <Button onClick={openWhatsApp} size="lg" variant="outline" className="border-2 border-[#E62020] text-[#E62020] hover:bg-[#E62020] hover:text-white text-lg px-10 py-6 font-bold rounded-full">
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-12">
            <CheckCircle2 className="h-4 w-4 inline mr-1 text-[#E62020]" />
            Trusted by 17K+ Happy Travelers | 13+ Years Experience
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all shadow-md">
              <div className="w-14 h-14 bg-[#E62020] rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <span className="text-base md:text-lg text-gray-900 font-semibold">Local Expertise</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all shadow-md">
              <div className="w-14 h-14 bg-[#E62020] rounded-full flex items-center justify-center">
                <TrendingDown className="h-7 w-7 text-white" />
              </div>
              <span className="text-base md:text-lg text-gray-900 font-semibold">Best Prices</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all shadow-md">
              <div className="w-14 h-14 bg-[#E62020] rounded-full flex items-center justify-center">
                <Headphones className="h-7 w-7 text-white" />
              </div>
              <span className="text-base md:text-lg text-gray-900 font-semibold">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all shadow-md">
              <div className="w-14 h-14 bg-[#E62020] rounded-full flex items-center justify-center">
                <Award className="h-7 w-7 text-white" />
              </div>
              <span className="text-base md:text-lg text-gray-900 font-semibold">Trusted Experts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kashmir Tour Packages */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E62020] text-white text-sm px-4 py-2">
              Most Popular
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kashmir Tour Packages (4N/5D)
            </h2>
            <p className="text-xl text-gray-600">Explore the paradise on earth with our curated packages</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockData.kashmirPackages.map((pkg, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#E62020] text-white font-bold px-3 py-1">
                      Hot Deal
                    </Badge>
                  </div>
                </div>
                <CardHeader className="bg-[#E62020] text-white py-8">
                  <CardTitle className="text-2xl md:text-3xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-white/90 text-lg">{pkg.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="mb-6 text-center">
                    <div className="text-4xl font-bold text-black mb-2">{pkg.price}</div>
                    <p className="text-base text-gray-500">{pkg.priceDetails}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start space-x-3 text-base">
                        <CheckCircle2 className="h-5 w-5 text-[#E62020] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={scrollToForm} className="w-full bg-black hover:bg-gray-900 text-white py-6 text-lg font-bold shadow-lg rounded-full">
                    Enquire Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* International Tour Packages */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black text-white text-sm px-4 py-2">
              International Destinations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              International Tour Packages (4N/5D)
            </h2>
            <p className="text-xl text-gray-600">Discover amazing destinations across the globe</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.internationalPackages.map((pkg, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black text-white font-bold px-3 py-1">
                      Trending
                    </Badge>
                  </div>
                </div>
                <CardHeader className="bg-[#E62020] text-white py-8">
                  <CardTitle className="text-2xl md:text-3xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-white/90 text-lg">{pkg.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="mb-6 text-center">
                    <div className="text-4xl font-bold text-black mb-2">{pkg.price}</div>
                    <p className="text-base text-gray-500">{pkg.priceDetails}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start space-x-3 text-base">
                        <CheckCircle2 className="h-5 w-5 text-[#E62020] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={scrollToForm} className="w-full bg-black hover:bg-gray-900 text-white py-6 text-lg font-bold shadow-lg rounded-full">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Conversion Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Tripoday Holidays?
            </h2>
            <p className="text-xl text-gray-600">Your trusted partner for unforgettable journeys</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {mockData.trustPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-5 p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#E62020]">
                <div className="w-16 h-16 bg-[#E62020] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  {point.icon === 'price' && <TrendingDown className="h-8 w-8 text-white" />}
                  {point.icon === 'customize' && <Shield className="h-8 w-8 text-white" />}
                  {point.icon === 'support' && <Headphones className="h-8 w-8 text-white" />}
                  {point.icon === 'expert' && <Award className="h-8 w-8 text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                  <p className="text-gray-600 text-lg">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h3>
            <div className="flex justify-center items-center space-x-2 text-[#E62020]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 fill-[#E62020]" />
              ))}
              <span className="ml-3 text-gray-700 font-semibold text-lg">4.7 out of 5 (175+ reviews)</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-[#E62020] text-[#E62020]" />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic text-lg">"{testimonial.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form-section" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plan Your Dream Trip
            </h2>
            <p className="text-xl text-gray-600">Fill in your details and get the best deals from our experts</p>
          </div>
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 py-6 text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 py-6 text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 py-6 text-lg"
                  />
                </div>
                <div>
                  <Select value={formData.destination} onValueChange={handleDestinationChange} required>
                    <SelectTrigger className="w-full border-2 py-6 text-lg">
                      <SelectValue placeholder="Destination Interested In *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    type="text"
                    name="travelDate"
                    placeholder="Travel Date (e.g., June 2025)"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="w-full border-2 py-6 text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    name="travelers"
                    placeholder="Number of Travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full border-2 py-6 text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E62020] hover:bg-[#cc0e00] text-white py-7 text-xl font-bold shadow-xl rounded-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Best Deal'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#E62020] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E62020] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Limited Slots Available – Plan Your Trip Now
          </h2>
          <p className="text-base md:text-lg mb-8 opacity-90">
            Don't miss out on exclusive deals. Our travel experts are ready to help you!
          </p>
          <Button onClick={openForm} size="lg" className="bg-[#E62020] text-white hover:bg-[#cc0e00] text-lg px-10 py-6 font-bold shadow-2xl rounded-full">
            <Sparkles className="h-5 w-5 mr-2" />
            Get Instant Callback
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_tripoday-tours/artifacts/fxh6ufsj_IMG_0560%20%281%29.PNG" 
                alt="Tripoday Holidays Logo" 
                className="h-24 mb-4"
              />
              <p className="text-lg font-semibold text-white mb-3">Tripoday Holidays</p>
              <p className="text-white mb-4 text-base">Your trusted partner for unforgettable Kashmir and international experiences.</p>
              <div className="flex items-center text-sm text-white">
                <Star className="h-5 w-5 text-[#E62020] fill-[#E62020] mr-1" />
                <span className="font-semibold">4.7</span>
                <span className="ml-1">(175+ Google Reviews)</span>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Contact Us</h4>
              <div className="space-y-4 text-white">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-[#E62020] mt-0.5 flex-shrink-0" />
                  <span className="text-base">7 Square Mall, Shah Anwar Colony, Hyderpora, Srinagar, J&K 190014</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-[#E62020]" />
                  <span className="font-semibold text-white text-base">Open 24 Hours</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Popular Destinations</h4>
              <div className="space-y-3 text-white text-base">
                <p className="hover:text-[#E62020] cursor-pointer transition-colors">Kashmir Packages</p>
                <p className="hover:text-[#E62020] cursor-pointer transition-colors">Honeymoon Tours</p>
                <p className="hover:text-[#E62020] cursor-pointer transition-colors">Dubai Tours</p>
                <p className="hover:text-[#E62020] cursor-pointer transition-colors">Maldives Tours</p>
                <p className="hover:text-[#E62020] cursor-pointer transition-colors">Thailand Tours</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-white">
            <p>&copy; 2025 Tripoday Holidays. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Lead Capture Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          {!showThankYou ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-gray-900">Get Best Deal</DialogTitle>
                <DialogDescription className="text-base">
                  Fill in your details and our travel expert will contact you shortly
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full py-6 text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full py-6 text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full py-6 text-lg"
                  />
                </div>
                <div>
                  <Select value={formData.destination} onValueChange={handleDestinationChange} required>
                    <SelectTrigger className="w-full py-6 text-lg">
                      <SelectValue placeholder="Destination Interested In *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    type="text"
                    name="travelDate"
                    placeholder="Travel Date (e.g., June 2025)"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="w-full py-6 text-lg"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    name="travelers"
                    placeholder="Number of Travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full py-6 text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E62020] hover:bg-[#cc0e00] text-white py-7 text-xl font-bold rounded-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Best Deal'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <DialogTitle className="text-3xl font-bold text-gray-900 mb-3">Thank You!</DialogTitle>
              <DialogDescription className="text-lg">
                Your inquiry has been submitted successfully. Our travel expert will contact you within 24 hours.
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;