import Link from "next/link";
import { Sparkles, Shield, Zap, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Notionary
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors font-medium hover:scale-105 transform duration-200">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary-600 transition-colors font-medium hover:scale-105 transform duration-200">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium hover:scale-105 transform duration-200">
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-5 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium hover:scale-105 transform duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-gradient-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 rounded-full text-sm font-medium mb-8 border border-primary-200/50">
              <Sparkles className="h-4 w-4 mr-2" />
              New: AI-powered organization
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              <span className="block text-gray-900 mb-3">Organize your work,</span>
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent animate-gradient">
                amplify your life.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Notionary gives you the building blocks to create your own workspace. Write, plan, collaborate, and get organized — all in one beautiful tool.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                Start For Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="flex items-center">
                  Explore Features
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need in <span className="text-primary-600">one place</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you work smarter, not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Enterprise Security
              </h3>
              <p className="text-gray-600 mb-6">
                Bank-level encryption and security protocols to keep your data safe and private.
              </p>
              <ul className="space-y-3">
                {['End-to-end encryption', 'Two-factor authentication', 'Regular security audits'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Blazing Fast
              </h3>
              <p className="text-gray-600 mb-6">
                Optimized performance with real-time updates and instant search across all your notes.
              </p>
              <ul className="space-y-3">
                {['Instant search', 'Real-time sync', 'Offline access'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600 mb-6">
                Work together seamlessly with shared workspaces, comments, and version history.
              </p>
              <ul className="space-y-3">
                {['Real-time editing', 'Team workspaces', 'Comment threads'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Join thousands of professionals who have already streamlined their work with Notionary.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-900 py-6 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md shadow-primary-500/10">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Notionary</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-600">
                © {new Date().getFullYear()} Notionary. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Made with ❤️ for productive minds
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}