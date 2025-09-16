export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  accountType: 'Admin' | 'Student' | 'Instructor';
  additionalDetails: Profile;
  courses?: Course[];
  image?: string;
  contact?: string;
}

export interface Profile {
  _id: string;
  gender?: string;
  DOB?: string;
  about?: string;
  contact?: string;
}

export interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  instructor: User;
  whatWillYouLearn: string;
  courseContent: Section[];
  ratingAndReviews?: RatingAndReview[];
  price: number;
  thumbnail: string;
  category: Category;
  studentsEnrolled: User[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  courses?: Course[];
}

export interface Section {
  _id: string;
  sectionName: string;
  subSection: SubSection[];
}

export interface SubSection {
  _id: string;
  title: string;
  timeDuration: string;
  description: string;
  videoUrl: string;
}

export interface RatingAndReview {
  _id: string;
  user: User;
  rating: number;
  reviews: string;
  course?: Course;
}

export interface CourseProgress {
  _id: string;
  courseID: Course;
  completedVideos: SubSection[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: 'Student' | 'Instructor';
  contact?: string;
  otp: string;
}

export interface OtpRequest {
  email: string;
}

export interface ChangePasswordData {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateCourseData {
  name: string;
  description: string;
  price: number;
  whatWillYouLearn: string;
  category: string;
  thumbnailImage: File;
}

export interface CreateSectionData {
  sectionName: string;
  courseId: string;
}

export interface UpdateSectionData {
  sectionName: string;
  sectionId: string;
}

export interface CreateSubSectionData {
  title: string;
  description: string;
  timeDuration: string;
  videoFile: File;
  sectionId: string;
}