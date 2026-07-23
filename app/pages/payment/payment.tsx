import * as React from "react";
import { useNavigate } from "react-router";
import { Layout } from "../../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Check,
  ChevronRight,
  Info,
  Calendar,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Building,
  QrCode,
  Ticket,
  Download,
  Sparkles,
  MapPin,
  Clock
} from "lucide-react";

export function PaymentPage() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = React.useState("John Doe");
  const [email, setEmail] = React.useState("john.doe@email.com");
  const [phone, setPhone] = React.useState("+62 812-3456-7890");
  const [specialRequests, setSpecialRequests] = React.useState("");

  // Payment states
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "ewallet" | "transfer">("card");
  
  // Card states
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCVV, setCardCVV] = React.useState("");
  const [isCardFlipped, setIsCardFlipped] = React.useState(false);

  // E-Wallet selected
  const [selectedEwallet, setSelectedEwallet] = React.useState<"gopay" | "ovo" | "dana" | "shopeepay">("gopay");

  // Bank selected
  const [selectedBank, setSelectedBank] = React.useState<"bca" | "mandiri" | "bni">("bca");
  const [isCopied, setIsCopied] = React.useState(false);

  // Process / Success Modal states
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processStep, setProcessStep] = React.useState(0);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Formatting Card Number: Insert spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Formatting Expiry: MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setCardExpiry(value);
  };

  // Formatting CVV: max 3 digits
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCardCVV(value);
  };

  // Virtual Account Generator
  const getVANumber = () => {
    switch (selectedBank) {
      case "bca": return "8830181234567890";
      case "mandiri": return "8902281234567890";
      case "bni": return "8810881234567890";
      default: return "8830181234567890";
    }
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText(getVANumber());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please complete your contact information.");
      return;
    }
    if (paymentMethod === "card" && (cardNumber.length < 19 || cardExpiry.length < 5 || cardCVV.length < 3)) {
      alert("Please complete your credit/debit card details.");
      return;
    }

    setIsProcessing(true);
    setProcessStep(0);

    // Run mock step-by-step validation
    const steps = [
      "Verifying your payment details...",
      "Connecting to merchant gateway...",
      "Securing your ticket & seats...",
      "Done! Generating your e-ticket..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProcessStep(currentStep);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIsSuccess(true);
      }
    }, 1000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center pt-36 pb-16 px-4 bg-slate-900 sm:px-8 md:px-12 text-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url('/images/bromo.jpg')` }}
      >
        <div className="bg-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/85 z-[1] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-500/20">
						Secure Checkout
					</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Complete Your Payment
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            The final step to securing your dream trip with Tripora.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-8 md:px-12 min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          {/* Back to Itinerary link */}
          <button
            onClick={() => navigate("/itinerary")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6 border-0 bg-transparent cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to Itinerary Details
          </button>

          <form onSubmit={handlePayNow} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form & Payment Method */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Card 1: Traveler Details */}
              <Card className="border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden bg-white">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <User className="size-4" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Traveler & Contact Details</h3>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</Label>
                      <div className="relative flex items-center">
                        <Input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name as in Passport/ID"
                          className="pl-9 h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all"
                        />
                        <User className="size-4 text-slate-400 absolute left-3" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</Label>
                      <div className="relative flex items-center">
                        <Input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email for e-ticket delivery"
                          className="pl-9 h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all"
                        />
                        <Mail className="size-4 text-slate-400 absolute left-3" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone / WhatsApp Number</Label>
                      <div className="relative flex items-center">
                        <Input
                          id="phone"
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Example: +62 812-3456-7890"
                          className="pl-9 h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all"
                        />
                        <Phone className="size-4 text-slate-400 absolute left-3" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="requests" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Special Requests (Optional)</Label>
                      <Input
                        id="requests"
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Food allergies, child bed, etc."
                        className="h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Payment Method */}
              <Card className="border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden bg-white">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CreditCard className="size-4" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Payment Method</h3>
                </div>
                
                <CardContent className="p-6">
                  {/* Selectable tabs for methods */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer bg-white text-center ${
                        paymentMethod === "card"
                          ? "border-blue-600 bg-blue-50/10 text-blue-750 shadow-xs"
                          : "border-slate-200 hover:border-slate-350 text-slate-500"
                      }`}
                    >
                      <CreditCard className="size-5 mb-1.5" />
                      <span className="text-xs font-bold">Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("ewallet")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer bg-white text-center ${
                        paymentMethod === "ewallet"
                          ? "border-blue-600 bg-blue-50/10 text-blue-750 shadow-xs"
                          : "border-slate-200 hover:border-slate-350 text-slate-500"
                      }`}
                    >
                      <QrCode className="size-5 mb-1.5" />
                      <span className="text-xs font-bold">E-Wallet QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("transfer")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer bg-white text-center ${
                        paymentMethod === "transfer"
                          ? "border-blue-600 bg-blue-50/10 text-blue-750 shadow-xs"
                          : "border-slate-200 hover:border-slate-350 text-slate-500"
                      }`}
                    >
                      <Building className="size-5 mb-1.5" />
                      <span className="text-xs font-bold">Transfer VA</span>
                    </button>
                  </div>

                  {/* Dynamic sections based on selected payment method */}

                  {/* 1. CREDIT/DEBIT CARD */}
                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      {/* Left: Card inputs */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="cardNum" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</Label>
                          <Input
                            id="cardNum"
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            className="h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="cardHold" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cardholder Name</Label>
                          <Input
                            id="cardHold"
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            placeholder="CARDHOLDER NAME"
                            className="h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all uppercase"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="cardExp" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</Label>
                            <Input
                              id="cardExp"
                              type="text"
                              required={paymentMethod === "card"}
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className="h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor="cardCvv" className="text-xs font-bold text-slate-500 uppercase tracking-wider">CVV</Label>
                            <Input
                              id="cardCvv"
                              type="text"
                              required={paymentMethod === "card"}
                              value={cardCVV}
                              onChange={handleCVVChange}
                              onFocus={() => setIsCardFlipped(true)}
                              onBlur={() => setIsCardFlipped(false)}
                              placeholder="123"
                              className="h-11 bg-slate-50/30 border-slate-200 text-slate-800 rounded-xl focus:bg-white transition-all font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Beautiful interactive credit card visualizer */}
                      <div className="md:col-span-5 flex justify-center py-4">
                        <div 
                          className="w-72 h-44 rounded-2xl relative shadow-xl transition-all duration-700 cursor-pointer overflow-hidden"
                          style={{
                            perspective: "1000px",
                            transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            transformStyle: "preserve-3d"
                          }}
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                        >
                          {/* Front Side */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white p-5 flex flex-col justify-between rounded-2xl"
                            style={{ backfaceVisibility: "hidden" }}
                          >
                            <div className="flex justify-between items-start">
                              {/* Chip */}
                              <div className="w-10 h-7 bg-amber-350/80 rounded-md shadow-inner relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-1 border border-amber-900/10 rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5">
                                  {[...Array(9)].map((_, i) => <div key={i} className="border-[0.5px] border-amber-900/20"></div>)}
                                </div>
                              </div>
                              <span className="text-xs font-bold tracking-widest text-slate-350">VISA</span>
                            </div>

                            {/* Card Number */}
                            <div className="text-base font-mono tracking-widest my-2 select-all h-6">
                              {cardNumber || "•••• •••• •••• ••••"}
                            </div>

                            <div className="flex justify-between items-end">
                              <div className="flex flex-col text-left">
                                <span className="text-[8px] text-slate-400 uppercase">Cardholder</span>
                                <span className="text-xs font-bold uppercase truncate max-w-[150px] font-mono h-4">
                                  {cardName || "JOHN DOE"}
                                </span>
                              </div>
                              <div className="flex flex-col text-right">
                                <span className="text-[8px] text-slate-400 uppercase">Expires</span>
                                <span className="text-xs font-bold font-mono h-4">
                                  {cardExpiry || "MM/YY"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Back Side */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-950 text-white flex flex-col justify-between py-5 rounded-2xl"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)"
                            }}
                          >
                            <div className="w-full h-10 bg-slate-950/80 mt-1"></div>
                            
                            <div className="px-5 flex items-center gap-3">
                              <div className="w-44 h-7 bg-white/95 rounded flex items-center justify-end px-2 text-slate-700 font-mono text-xs italic tracking-wider font-bold">
                                xxx xxxx xxxx
                              </div>
                              <div className="w-12 h-6 bg-amber-400 text-slate-900 rounded font-mono text-sm font-bold flex items-center justify-center">
                                {cardCVV || "•••"}
                              </div>
                            </div>

                            <div className="px-5 flex justify-between items-center text-[8px] text-slate-400">
                              <span>Secure 3D Secure</span>
                              <span>Tripora Pay</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. E-WALLET */}
                  {paymentMethod === "ewallet" && (
                    <div className="space-y-6 text-center md:text-left">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(["gopay", "ovo", "dana", "shopeepay"] as const).map((wallet) => (
                          <button
                            key={wallet}
                            type="button"
                            onClick={() => setSelectedEwallet(wallet)}
                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer bg-white transition-all ${
                              selectedEwallet === wallet
                                ? "border-blue-600 bg-blue-50/20 text-blue-750 font-bold"
                                : "border-slate-200 text-slate-600 hover:border-slate-350"
                            }`}
                          >
                            <span className="capitalize font-bold text-sm">{wallet}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 border border-slate-200/60 p-6 rounded-2xl">
                        {/* Mock QR Code */}
                        <div className="size-40 bg-white p-3 border border-slate-250 rounded-2xl flex flex-col items-center justify-center shadow-xs shrink-0 relative overflow-hidden group">
                          {/* Simple QR mockup layout using flex box grid */}
                          <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-300">
                            {/* QR corners */}
                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="border border-slate-900"></div>
                            <div className="bg-slate-900 rounded-xs"></div>

                            <div className="border border-slate-900"></div>
                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="border border-slate-900"></div>

                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="border border-slate-900"></div>
                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="bg-slate-900 rounded-xs"></div>

                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="bg-slate-900 rounded-xs"></div>
                            <div className="border border-slate-900"></div>
                            <div className="bg-slate-900 rounded-xs"></div>
                          </div>
                          <div className="absolute inset-0 bg-blue-500/5 flex items-center justify-center">
                            <span className="bg-white px-2 py-0.5 rounded text-[8px] font-bold text-slate-800 border border-slate-100 shadow-xs capitalize">{selectedEwallet}</span>
                          </div>
                        </div>

                        <div className="space-y-3 text-left">
                          <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                            <QrCode className="size-5 text-blue-600" />
                            Pay with QRIS
                          </h4>
                              <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                                Scan the QRIS code on the left using your e-wallet app (<span className="capitalize font-semibold">{selectedEwallet}</span>, LinkAja, or m-banking). Your payment will be verified automatically.
                              </p>
                              <div className="bg-amber-50 text-amber-800 text-[11px] p-2.5 rounded-lg border border-amber-200/50 flex gap-2 items-start max-w-md">
                                <Info className="size-4 shrink-0 mt-0.5 text-amber-600" />
                                <span>Payment window: 15 minutes. Your ticket will be released if unpaid.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. BANK TRANSFER */}
                      {paymentMethod === "transfer" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-3">
                            {(["bca", "mandiri", "bni"] as const).map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => {
                                  setSelectedBank(bank);
                                  setIsCopied(false);
                                }}
                                className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer bg-white transition-all ${
                                  selectedBank === bank
                                    ? "border-blue-600 bg-blue-50/20 text-blue-750 font-bold"
                                    : "border-slate-200 text-slate-600 hover:border-slate-350"
                                }`}
                              >
                                <span className="uppercase font-bold text-sm">{bank}</span>
                                <span className="text-[10px] text-slate-400">Virtual Account</span>
                              </button>
                            ))}
                          </div>

                          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                              <div className="text-left">
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Virtual Account Number</span>
                                <h3 className="text-xl md:text-2xl font-mono font-bold text-slate-900 tracking-wider mt-1 select-all">
                                  {getVANumber()}
                                </h3>
                              </div>
                              
                              <button
                                type="button"
                                onClick={handleCopyVA}
                                className="bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5 justify-center border-0"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="size-4 text-emerald-600" />
                                    <span className="text-emerald-700 font-bold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="ri-file-copy-line size-4 flex items-center justify-center"></span>
                                    <span>Copy Code</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <Separator className="bg-slate-200" />

                            <div className="space-y-2.5 text-left text-xs md:text-sm text-slate-650">
                              <h4 className="font-bold text-slate-800">Payment Instructions:</h4>
                              <ol className="list-decimal list-inside space-y-1.5 pl-1">
                                <li>Insert your ATM card or open your m-banking app for <span className="uppercase font-semibold">{selectedBank}</span>.</li>
                                <li>Select <span className="font-semibold">Transfer / Other Transactions</span> &gt; <span className="font-semibold">Virtual Account</span>.</li>
                                <li>Enter the virtual account number above: <span className="font-mono font-semibold">{getVANumber()}</span>.</li>
                                <li>Ensure the transfer amount matches the total payment: <span className="font-semibold">Rp 1,450,000</span>.</li>
                                <li>Save your transaction receipt or take a screenshot as proof of payment.</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Secure Transaction Note */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-blue-50/40 border border-blue-100/50 rounded-2xl">
                    <ShieldCheck className="size-6 text-emerald-600 shrink-0" />
                    <p className="text-xs text-slate-650 leading-relaxed text-left">
                      Every payment is protected by world-class 256-bit SSL encryption and monitored by financial authorities (OJK). Tripora never stores your full credit card details.
                    </p>
                  </div>
            </div>

            {/* Right Column: Order Summary & Pay */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              
              {/* Card 3: Summary */}
              <Card className="border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden bg-white text-left">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-base text-slate-900">Order Summary</h3>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  {/* Trip details preview */}
                  <div className="space-y-3">
                    <div className="flex gap-4 items-start">
                      <div className="size-16 rounded-xl overflow-hidden shrink-0">
                        <img src="/images/bromo.jpg" alt="Bali to Central Java" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">Bali to Central Java</h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <MapPin className="size-3.5 text-red-500" />
                          <span className="truncate">Indonesia (4 Destinations)</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock className="size-3.5 text-blue-500" />
                          <span>2 Days, 1 Night</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  {/* Price breakdown */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Price Details</span>
                    
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between text-slate-650">
                        <span>Destination Entry Tickets (x1)</span>
                        <span>Rp 450.000</span>
                      </div>
                      <div className="flex justify-between text-slate-650">
                        <span>Accommodation & Bromo Jeep</span>
                        <span>Rp 750.000</span>
                      </div>
                      <div className="flex justify-between text-slate-650">
                        <span>Licensed Local Guide</span>
                        <span>Rp 300.000</span>
                      </div>
                      <div className="flex justify-between text-slate-650 font-semibold text-slate-700">
                        <span>Tripora Service Fee</span>
                        <span>Rp 50.000</span>
                      </div>

                      <Separator className="bg-slate-100/60 my-2" />

                      <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/50 text-xs">
                        <span className="flex items-center gap-1">
                          <Sparkles className="size-3.5" />
                          Promo: TRIPORAFEST
                        </span>
                        <span>- Rp 100.000</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  {/* Total price */}
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total Payment:</span>
                    <span className="text-2xl font-extrabold text-blue-600 font-sans">
                      Rp 1.450.000
                    </span>
                  </div>

                  {/* Checkout Action Button */}
                  <Button
                    type="submit"
                    className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-xs transition-all text-base border-0 flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Lock className="size-4" />
                    Pay Now
                  </Button>
                  
                  <p className="text-[10px] text-center text-slate-400">
                    By pressing the button, you agree to Tripora's Terms of Use and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </section>

      {/* --- MODAL 1: PROCESSING PAYMENT --- */}
      {isProcessing && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-200">
            {/* Spinning Loader */}
            <div className="relative size-16">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Processing Payment</h3>
              <p className="text-slate-500 text-sm h-6 transition-all duration-300 font-semibold text-blue-650">
                {processStep === 0 && "Verifying your payment details..."}
                {processStep === 1 && "Connecting to merchant gateway..."}
                {processStep === 2 && "Securing your ticket & seats..."}
                {processStep === 3 && "Done! Generating your e-ticket..."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: SUCCESS DIALOG WITH TICKET PASS --- */}
      {isSuccess && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-20 animate-in zoom-in-95 duration-250 border border-slate-100 my-8">
            
            {/* Top Confetti & Header */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center space-y-2 relative overflow-hidden">
              {/* Glowing effects */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent"></div>
              <div className="size-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto mb-2 border border-white/20">
                <Check className="size-8" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">Payment Successful!</h3>
              <p className="text-blue-100 text-sm">Your payment has been received. Your e-ticket has been sent to your email.</p>
            </div>

            {/* Ticket Card Pass Visualizer */}
            <div className="p-6 md:p-8 bg-slate-50 flex flex-col items-center">
              <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden relative">
                
                {/* Boarding Pass Layout */}
                <div className="p-6 space-y-6">
                  {/* Top Bar Logo */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="ri-rocket-fill text-blue-650 text-xl"></span>
                      <span className="font-extrabold text-sm text-slate-800">Tripora Ticket</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">
                      Paid &amp; Confirmed
                    </span>
                  </div>

                  {/* Route Info */}
                  <div className="grid grid-cols-3 items-center text-center">
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Departure</span>
                      <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">BALI</h4>
                      <span className="text-[10px] text-slate-500">DPS Airport</span>
                    </div>

                    <div className="flex flex-col items-center justify-center relative">
                      <div className="w-full border-t-2 border-dashed border-slate-200 absolute top-1/2"></div>
                      <span className="ri-plane-fill text-blue-650 text-base bg-white px-2 relative z-10"></span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Destination</span>
                      <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">JATENG</h4>
                      <span className="text-[10px] text-slate-500">Central Java</span>
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-y-4 text-xs">
                    <div className="text-left">
                      <span className="text-slate-400 block font-semibold">Passenger Name</span>
                      <span className="font-bold text-slate-800 text-sm mt-0.5 block">{name}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-slate-400 block font-semibold">Booking ID</span>
                      <span className="font-bold text-slate-800 text-sm mt-0.5 block">TP-2026-993812</span>
                    </div>
                    <div className="text-left">
                      <span className="text-slate-400 block font-semibold">Departure Date</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">July 12, 2026</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block font-semibold">Service Class</span>
                      <span className="font-bold text-blue-600 mt-0.5 block">Premium Explorer</span>
                    </div>
                  </div>
                </div>

                {/* Perforated ticket divider */}
                <div className="flex justify-between items-center px-4 relative my-2">
                  <div className="size-4 bg-slate-50 rounded-full border border-slate-200 border-l-transparent absolute -left-2 z-10"></div>
                  <div className="w-full border-t-2 border-dashed border-slate-200"></div>
                  <div className="size-4 bg-slate-50 rounded-full border border-slate-200 border-r-transparent absolute -right-2 z-10"></div>
                </div>

                {/* Bottom Ticket: Barcode QR */}
                <div className="p-6 bg-slate-50/50 flex flex-col items-center justify-center space-y-4">
                  {/* Mock Barcode or QR Code */}
                  <div className="size-32 bg-white p-2 border border-slate-200 rounded-xl flex items-center justify-center shadow-xs">
                    {/* Visual grid representing QR Code */}
                    <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full opacity-90">
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div className="bg-slate-800 rounded-xs"></div>

                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>

                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>

                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>

                      <div className="bg-slate-800 rounded-xs"></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                      <div className="bg-slate-800 rounded-xs"></div>
                    </div>
                  </div>
                  
                  <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                    Scan at departure gate
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => alert("Downloading e-ticket PDF...")}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-bold transition-all text-sm border-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="size-4" />
                Download E-Ticket
              </Button>
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  navigate("/");
                }}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all text-sm border-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
