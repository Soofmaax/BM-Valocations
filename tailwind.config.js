@@ .. @@
       animation: {
         'fade-in': 'fade-in 0.3s ease-out',
         'slide-up': 'slide-up 0.3s ease-out',
         'fade-in-up': 'fade-in-up 0.3s ease-out',
+        'scale-in': 'scale-in 0.2s ease-out',
+        'bounce-subtle': 'bounce-subtle 0.6s ease-out',
       },
       keyframes: {
         'fade-in': {
           '0%': { opacity: '0' },
           '100%': { opacity: '1' },
         },
         'slide-up': {
           '0%': { transform: 'translateY(20px)', opacity: '0' },
           '100%': { transform: 'translateY(0)', opacity: '1' },
         },
         'fade-in-up': {
           '0%': { transform: 'translateY(30px)', opacity: '0' },
           '100%': { transform: 'translateY(0)', opacity: '1' },
         },
+        'scale-in': {
+          '0%': { transform: 'scale(0.9)', opacity: '0' },
+          '100%': { transform: 'scale(1)', opacity: '1' },
+        },
+        'bounce-subtle': {
+          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
+          '40%, 43%': { transform: 'translate3d(0, -5px, 0)' },
+          '70%': { transform: 'translate3d(0, -2px, 0)' },
+          '90%': { transform: 'translate3d(0, -1px, 0)' },
+        },
       },
+      backdropBlur: {
+        xs: '2px',
+      },
     },
   },
   plugins: [],