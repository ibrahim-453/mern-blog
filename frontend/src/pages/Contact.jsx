import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
 const API_BASE = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send message");
        return;
      }

      toast.success(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text dark:text-text-dark mb-4 sm:mb-6">
            Get In Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary dark:text-text-secondary-dark max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-2">
                    Email Us
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    contact@myblog.com
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    support@myblog.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-2">
                    Call Us
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    Mon-Fri: 9AM - 6PM EST
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-card-dark rounded-xl p-6 sm:p-8 border border-border dark:border-border-dark">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-1 dark:bg-accent-1-dark rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text dark:text-text-dark mb-2">
                    Visit Us
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    123 Blog Street
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card dark:bg-card-dark rounded-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
              <h2 className="text-2xl sm:text-3xl font-bold text-text dark:text-text-dark mb-6 sm:mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm sm:text-base font-medium text-text dark:text-text-dark"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm sm:text-base font-medium text-text dark:text-text-dark"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-sm sm:text-base font-medium text-text dark:text-text-dark"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm sm:text-base font-medium text-text dark:text-text-dark"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
