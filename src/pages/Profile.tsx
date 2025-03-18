
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { Footerdemo } from '@/components/ui/footer-section';
import { ChevronLeft, Calendar, MapPin, Phone, User } from "lucide-react";
import { isSignInWithEmailLink, signInWithEmailLink, updateProfile } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet';
import { useTheme } from '@/contexts/ThemeContext';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Profile = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Form schema for validation
  const formSchema = z.object({
    displayName: z.string().min(2, {
      message: language === 'en' ? 'Name must be at least 2 characters.' : 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร',
    }),
    birthDate: z.date({
      required_error: language === 'en' ? 'Please select a date.' : 'กรุณาเลือกวันที่',
    }),
    phone: z.string().min(9, {
      message: language === 'en' ? 'Phone number must be valid.' : 'หมายเลขโทรศัพท์ต้องถูกต้อง',
    }),
    address: z.string().min(5, {
      message: language === 'en' ? 'Address must be at least 5 characters.' : 'ที่อยู่ต้องมีอย่างน้อย 5 ตัวอักษร',
    }),
    city: z.string().min(2, {
      message: language === 'en' ? 'City must be at least 2 characters.' : 'เมืองต้องมีอย่างน้อย 2 ตัวอักษร',
    }),
    postalCode: z.string().min(5, {
      message: language === 'en' ? 'Postal code must be valid.' : 'รหัสไปรษณีย์ต้องถูกต้อง',
    }),
    province: z.string().min(2, {
      message: language === 'en' ? 'Province must be at least 2 characters.' : 'จังหวัดต้องมีอย่างน้อย 2 ตัวอักษร',
    }),
  });

  // Get profile data from localStorage or set defaults
  const getProfileData = () => {
    const user = auth.currentUser;
    if (!user) return null;
    
    const savedProfile = localStorage.getItem(`profile_${user.uid}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      // If birthDate is stored as string, convert it to Date
      if (parsedProfile.birthDate && typeof parsedProfile.birthDate === 'string') {
        parsedProfile.birthDate = new Date(parsedProfile.birthDate);
      }
      return parsedProfile;
    }
    
    return {
      displayName: user.displayName || '',
      email: user.email || '',
      birthDate: new Date(1990, 0, 1), // Default date
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
    };
  };

  // Setup form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getProfileData() || {
      displayName: '',
      birthDate: new Date(1990, 0, 1),
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
    },
  });

  useEffect(() => {
    const processPendingEmailLink = async () => {
      // Check if this is an email link sign-in attempt
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const emailFromStorage = window.localStorage.getItem('emailForSignIn');
        if (emailFromStorage) {
          try {
            await signInWithEmailLink(auth, emailFromStorage, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            toast.success(language === "en" ? 'Successfully signed in!' : 'เข้าสู่ระบบสำเร็จ!');
            
            // Wait a moment to ensure Firebase auth state updates
            setTimeout(() => {
              if (auth.currentUser) {
                // Force refresh profile data after successful sign-in
                const profileData = getProfileData();
                if (profileData) {
                  form.reset(profileData);
                }
              }
            }, 500);
          } catch (error) {
            console.error('Error signing in with email link:', error);
            toast.error(language === "en" ? 'Failed to sign in. Please try again.' : 'ไม่สามารถเข้าสู่ระบบได้ โปรดลองอีกครั้ง');
            navigate('/');
          }
        }
      }
      
      setAuthInitialized(true);
    };

    processPendingEmailLink();
    
    // Set up auth state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && authInitialized) {
        console.log("No user detected, redirecting to home");
        navigate('/');
        return;
      }
      
      if (user) {
        console.log("User authenticated:", user.uid);
        // Load profile data when auth state changes
        const profileData = getProfileData();
        if (profileData) {
          form.reset(profileData);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, language, form, authInitialized]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Update displayName in Firebase
      await updateProfile(user, {
        displayName: data.displayName,
      });

      // Save all profile data to localStorage
      const profileData = {
        ...data,
        email: user.email,
      };
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(profileData));

      toast.success(language === "en" ? 'Profile updated successfully' : 'อัปเดตโปรไฟล์สำเร็จ');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(language === "en" ? 'Failed to update profile' : 'ไม่สามารถอัปเดตโปรไฟล์ได้');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success(language === "en" ? 'Signed out successfully' : 'ออกจากระบบสำเร็จ');
      navigate('/');
    } catch (error) {
      toast.error(language === "en" ? 'Failed to sign out' : 'ไม่สามารถออกจากระบบได้');
    }
  };

  const thaiProvinces = [
    'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 
    'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 
    'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 
    'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 
    'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 
    'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 
    'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 
    'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 
    'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 
    'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี'
  ];

  // Show loading state while checking authentication
  if (!authInitialized) {
    return (
      <div className={`flex h-screen w-full items-center justify-center ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p>{language === "en" ? "Checking authentication..." : "กำลังตรวจสอบการเข้าสู่ระบบ..."}</p>
        </div>
      </div>
    );
  }

  // Protect route - redirect to home if not authenticated
  if (!auth.currentUser) {
    console.log("No current user in Profile component, should have been redirected");
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      <Helmet>
        <title>{language === "en" ? "My Profile - SIAMTECH Online" : "โปรไฟล์ของฉัน - SIAMTECH ออนไลน์"}</title>
        <meta name="description" content={language === "en" 
          ? "Manage your SIAMTECH profile and account settings" 
          : "จัดการโปรไฟล์และการตั้งค่าบัญชี SIAMTECH ของคุณ"} />
        <html lang={language} />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-16 relative">
        <div className="absolute top-4 left-4 z-10">
          <Button variant="link" onClick={() => navigate('/')} className={theme === "dark" ? "text-white" : "text-gray-700"}>
            <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            {language === "en" ? "Go back" : "ย้อนกลับ"}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme === "dark" 
            ? "bg-gray-900/50 backdrop-blur-sm border border-white/10" 
            : "bg-white shadow-sm border border-gray-200"} rounded-lg p-8`}>
            
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {language === "en" ? "Profile Settings" : "การตั้งค่าโปรไฟล์"}
              </h1>
              <div>
                {isEditing ? (
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        form.reset(getProfileData());
                      }}
                    >
                      {language === "en" ? "Cancel" : "ยกเลิก"}
                    </Button>
                    <Button 
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      {language === "en" ? "Save" : "บันทึก"}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                  >
                    {language === "en" ? "Edit Profile" : "แก้ไขโปรไฟล์"}
                  </Button>
                )}
              </div>
            </div>
            
            <Form {...form}>
              <form className="space-y-6">
                <div className={`p-6 rounded-lg ${theme === "dark" 
                  ? "bg-gray-800/50 border border-white/5" 
                  : "bg-gray-50 border border-gray-100"}`}>
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    {language === "en" ? "Personal Information" : "ข้อมูลส่วนตัว"}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === "en" ? "Full Name" : "ชื่อเต็ม"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              className={theme === "dark" ? "bg-gray-700/50" : "bg-white"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === "en" ? "Email" : "อีเมล"}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={auth.currentUser?.email || ''}
                        readOnly
                        className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            {language === "en" ? "Date of Birth" : "วันเกิด"}
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  disabled={!isEditing}
                                  className={`w-full justify-start text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  } ${theme === "dark" ? "bg-gray-700/50" : "bg-white"}`}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>{language === "en" ? "Pick a date" : "เลือกวันที่"}</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === "en" ? "Phone Number" : "หมายเลขโทรศัพท์"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              placeholder={language === "en" ? "Enter your phone number" : "ใส่หมายเลขโทรศัพท์ของคุณ"}
                              className={theme === "dark" ? "bg-gray-700/50" : "bg-white"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${theme === "dark" 
                  ? "bg-gray-800/50 border border-white/5" 
                  : "bg-gray-50 border border-gray-100"}`}>
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    {language === "en" ? "Shipping Address" : "ที่อยู่จัดส่ง"}
                  </h2>
                  
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === "en" ? "Address" : "ที่อยู่"}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={!isEditing}
                              placeholder={language === "en" ? "Enter your full address" : "ใส่ที่อยู่เต็มของคุณ"}
                              className={`min-h-[80px] ${theme === "dark" ? "bg-gray-700/50" : "bg-white"}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === "en" ? "City/District" : "เขต/อำเภอ"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isEditing}
                                className={theme === "dark" ? "bg-gray-700/50" : "bg-white"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === "en" ? "Province" : "จังหวัด"}
                            </FormLabel>
                            <Select
                              disabled={!isEditing}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className={theme === "dark" ? "bg-gray-700/50" : "bg-white"}>
                                  <SelectValue placeholder={language === "en" ? "Select province" : "เลือกจังหวัด"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {thaiProvinces.map((province) => (
                                  <SelectItem key={province} value={province}>
                                    {province}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === "en" ? "Postal Code" : "รหัสไปรษณีย์"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isEditing}
                                className={theme === "dark" ? "bg-gray-700/50" : "bg-white"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className={`w-full ${theme === "dark" ? "hover:bg-red-900/20" : "hover:bg-red-50"} text-red-500 hover:text-red-600`}
              >
                {language === "en" ? "Sign Out" : "ออกจากระบบ"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footerdemo />
    </div>
  );
};

export default Profile;
