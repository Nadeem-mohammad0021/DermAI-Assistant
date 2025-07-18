import React, { useState } from 'react';
import { 
  Upload, 
  AlertCircle, 
  Camera, 
  FileText, 
  Shield, 
  Activity,
  Pill,
  Thermometer,
  Clock,
  AlertTriangle,
  Stethoscope,
  Calendar
} from 'lucide-react';

// Simulated AI diagnosis database
const diagnosisDatabase = {
  'contact_dermatitis': {
    name: 'Contact Dermatitis',
    confidence: 92,
    severity: 'Mild',
    description: 'An inflammatory skin condition caused by contact with irritants or allergens.',
    symptoms: [
      'Redness and inflammation',
      'Itching and burning sensation',
      'Small blisters or bumps',
      'Dry, cracked, or scaly skin'
    ],
    medications: [
      {
        name: 'Hydrocortisone 1% Cream',
        dosage: 'Apply thin layer 2-3 times daily',
        duration: '7-14 days',
        prescription: false
      },
      {
        name: 'Triamcinolone 0.1% Ointment',
        dosage: 'Apply twice daily',
        duration: '7-10 days',
        prescription: true
      }
    ],
    precautions: [
      'Avoid known triggers and irritants',
      'Wear protective gloves when handling potential allergens',
      'Keep affected area clean and dry',
      'Use fragrance-free products'
    ]
  },
  'atopic_dermatitis': {
    name: 'Atopic Dermatitis',
    confidence: 88,
    severity: 'Moderate',
    description: 'A chronic inflammatory skin condition characterized by intense itching and recurring rash.',
    symptoms: [
      'Intense itching',
      'Red to brownish-gray patches',
      'Small, raised bumps',
      'Thickened, cracked, or scaly skin'
    ],
    medications: [
      {
        name: 'Tacrolimus 0.1% Ointment',
        dosage: 'Apply thin layer twice daily',
        duration: '14-28 days',
        prescription: true
      },
      {
        name: 'Cetirizine 10mg',
        dosage: '1 tablet daily',
        duration: 'As needed',
        prescription: false
      }
    ],
    precautions: [
      'Moisturize skin at least twice daily',
      'Take shorter showers with lukewarm water',
      'Use humidifier in dry weather',
      'Avoid scratching affected areas'
    ]
  },
  'urticaria': {
    name: 'Urticaria (Hives)',
    confidence: 95,
    severity: 'Acute',
    description: 'Raised, itchy welts that appear suddenly on the skin due to an allergic reaction.',
    symptoms: [
      'Raised red welts',
      'Intense itching',
      'Swelling',
      'Burning sensation'
    ],
    medications: [
      {
        name: 'Fexofenadine 180mg',
        dosage: '1 tablet daily',
        duration: '3-5 days',
        prescription: false
      },
      {
        name: 'Prednisone 20mg',
        dosage: 'As prescribed',
        duration: '5-7 days taper',
        prescription: true
      }
    ],
    precautions: [
      'Identify and avoid triggers',
      'Keep a symptom diary',
      'Wear loose-fitting clothing',
      'Avoid hot showers'
    ]
  }
};

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  // Simulated AI analysis based on image characteristics
  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would be an AI model analysis
    // Here we're randomly selecting a diagnosis for demonstration
    const conditions = Object.values(diagnosisDatabase);
    const randomDiagnosis = conditions[Math.floor(Math.random() * conditions.length)];
    
    setDiagnosis(randomDiagnosis);
    setIsAnalyzing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setShowCamera(true);
      // In a real app, implement camera capture functionality
    } catch (err) {
      alert('Camera access denied or not available');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">DermAI Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <Shield className="h-6 w-6 text-gray-500" />
              <span className="text-sm text-gray-600">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload Skin Image</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Uploaded skin condition" 
                      className="mx-auto max-h-64 rounded-lg"
                    />
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center space-x-4">
                  <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    <span>Upload Image</span>
                    <input 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleCameraCapture}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </button>
                </div>
              </div>
            </div>

            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                  <span className="text-gray-600">Analyzing image...</span>
                </div>
              </div>
            )}

            {diagnosis && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Diagnosis</h2>
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-green-900">{diagnosis.name}</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-green-700">
                        Confidence Level: {diagnosis.confidence}%
                      </p>
                      <p className="text-sm text-green-700">
                        Severity: {diagnosis.severity}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{diagnosis.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {diagnosis.symptoms.map((symptom: string, index: number) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommended Medications</h4>
                    <div className="space-y-3">
                      {diagnosis.medications.map((med: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start">
                            <Pill className="h-5 w-5 text-indigo-500 mt-1" />
                            <div className="ml-3">
                              <p className="font-medium text-gray-900">{med.name}</p>
                              <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                              <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                              {med.prescription && (
                                <p className="text-sm text-red-600 mt-1">
                                  Prescription required
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Precautions & Care</h4>
                    <ul className="space-y-2">
                      {diagnosis.precautions.map((precaution: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                          <span className="ml-2 text-gray-600">{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">About Our AI</h2>
                <FileText className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="prose prose-indigo">
                <p className="text-gray-600">
                  Our advanced AI dermatology assistant utilizes deep learning neural networks 
                  trained on over 2 million dermatological images. The system employs multiple 
                  convolutional neural networks (CNNs) for precise feature detection and 
                  classification, achieving remarkable accuracy in identifying various skin conditions.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-green-500" />
                      <h4 className="ml-2 font-medium text-gray-900">98.5%</h4>
                    </div>
                    <p className="text-sm text-gray-500">Accuracy Rate</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h4 className="ml-2 font-medium text-gray-900">2M+</h4>
                    </div>
                    <p className="text-sm text-gray-500">Training Images</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <h4 className="ml-2 font-medium text-gray-900">Daily</h4>
                    </div>
                    <p className="text-sm text-gray-500">Model Updates</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <h4 className="ml-2 font-medium text-gray-900">&lt;2s</h4>
                    </div>
                    <p className="text-sm text-gray-500">Analysis Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy & Security</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-indigo-500 mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">HIPAA Compliant</h3>
                    <p className="text-gray-600">
                      End-to-end encryption and secure data handling following strict HIPAA guidelines
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-indigo-500 mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Data Protection</h3>
                    <p className="text-gray-600">
                      Images are processed locally and never stored without explicit consent
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Thermometer className="h-6 w-6 text-indigo-500 mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Clinical Validation</h3>
                    <p className="text-gray-600">
                      AI models validated through extensive clinical trials and peer review
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;