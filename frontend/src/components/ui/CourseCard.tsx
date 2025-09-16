import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  showInstructor?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showInstructor = true }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail || 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg'}
          alt={course.courseName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
            {course.category?.name || 'General'}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-secondary-600">4.8</span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
          {course.courseName}
        </h3>

        {/* Course Description */}
        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {course.courseDescription}
        </p>

        {/* Instructor */}
        {showInstructor && course.instructor && (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-primary-600 text-sm font-medium">
                {course.instructor.firstname?.[0]}{course.instructor.lastname?.[0]}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-900">
                {course.instructor.firstname} {course.instructor.lastname}
              </p>
              <p className="text-xs text-secondary-500">Instructor</p>
            </div>
          </div>
        )}

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.courseContent?.length || 0} sections</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.studentsEnrolled?.length || 0} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>12h 30m</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/courses/${course._id}`}
          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;