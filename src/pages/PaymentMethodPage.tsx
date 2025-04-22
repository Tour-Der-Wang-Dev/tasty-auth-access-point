
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Plus, Trash2, CheckCircle } from "lucide-react";
import { userProfile } from "../data/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState(userProfile.paymentMethods);
  const [showAddNew, setShowAddNew] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<string | null>(null);
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  
  const handleDeleteCard = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    setSelectedForDelete(null);
    
    toast({
      title: "Payment method removed",
      description: "The payment method has been successfully removed.",
    });
  };
  
  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    toast({
      title: "Default payment updated",
      description: "Your default payment method has been updated.",
    });
  };
  
  const handleAddCard = () => {
    // Basic validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast({
        title: "Missing information",
        description: "Please fill out all the card details.",
        variant: "destructive"
      });
      return;
    }
    
    if (cardNumber.length < 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid card number.",
        variant: "destructive"
      });
      return;
    }
    
    // Add new payment method
    const newMethod = {
      id: 'pm' + Math.floor(Math.random() * 10000),
      type: 'Visa', // In a real app, determine card type from number
      last4: cardNumber.slice(-4),
      isDefault: isDefault || paymentMethods.length === 0
    };
    
    if (isDefault) {
      // If new card is default, update other cards
      setPaymentMethods(methods => 
        methods.map(method => ({
          ...method,
          isDefault: false
        }))
      );
    }
    
    setPaymentMethods(methods => [...methods, newMethod]);
    setShowAddNew(false);
    
    // Reset form
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setIsDefault(false);
    
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Payment Methods</h1>
        </div>
      </div>
      
      {/* Payment Methods List */}
      <div className="p-4">
        <div className="space-y-3">
          {paymentMethods.map(payment => (
            <div 
              key={payment.id} 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {payment.type} •••• {payment.last4}
                    </div>
                    {payment.isDefault && (
                      <div className="text-xs text-primary mt-1">Default</div>
                    )}
                  </div>
                </div>
                
                <div className="flex">
                  {!payment.isDefault && (
                    <button 
                      className="mr-2 text-sm text-primary font-medium"
                      onClick={() => handleSetDefault(payment.id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    className="text-red-500"
                    onClick={() => setSelectedForDelete(payment.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Delete Confirmation */}
              {selectedForDelete === payment.id && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-3">
                    Are you sure you want to remove this payment method?
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 py-2 text-sm border border-gray-300 rounded-lg"
                      onClick={() => setSelectedForDelete(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="flex-1 py-2 text-sm bg-red-500 text-white rounded-lg"
                      onClick={() => handleDeleteCard(payment.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Add New Card Button */}
        {!showAddNew && (
          <button 
            className="mt-4 flex items-center justify-center w-full p-4 border border-dashed border-gray-300 rounded-lg text-primary"
            onClick={() => setShowAddNew(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Payment Method
          </button>
        )}
      </div>
      
      {/* Add New Payment Form */}
      {showAddNew && (
        <div className="bg-white p-4 mt-2">
          <h2 className="font-medium mb-4">Add New Card</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                type="text"
                inputMode="numeric"
                maxLength={19}
              />
            </div>
            
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Smith"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 2) {
                      setExpiryDate(value);
                    } else if (value.length <= 4) {
                      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
                    }
                  }}
                  maxLength={5}
                />
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                />
              </div>
            </div>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Set as default payment method</span>
            </label>
            
            <div className="flex space-x-3 mt-6">
              <button 
                className="flex-1 py-3 border border-gray-300 rounded-lg"
                onClick={() => setShowAddNew(false)}
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-3 bg-primary text-white rounded-lg"
                onClick={handleAddCard}
              >
                Add Card
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Your payment information is secure and encrypted.</p>
          </div>
        </div>
      )}
      
      {/* Security Message */}
      <div className="p-4 mt-2 text-center text-sm text-gray-500">
        <p>We use secure encryption to protect your payment information.</p>
        <p>Your card details are never stored on your device.</p>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
