import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

const Notification = ({ message, type, isVisible, onClose }) => {
  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]' 
    : 'bg-gradient-to-r from-red-500 to-red-600';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-4 z-50 min-w-[320px] max-w-md"
        >
          <div className={`${bgColor} rounded-lg shadow-lg p-4 text-white flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              {type === 'success' ? (
                <FaCheckCircle className="w-5 h-5" />
              ) : (
                <FaTimesCircle className="w-5 h-5" />
              )}
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;