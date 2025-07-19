import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const plugins = [react()];

  return {
    plugins,
    base: "/",
    
    // Performance optimizations
    build: {
      // Enable code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ['react', 'react-dom'],
            three: ['three', '@react-three/fiber', '@react-three/drei'],
            animations: ['framer-motion'],
          },
        },
      },
      // Enable compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
        },
      },
      // Increase chunk size warning limit for 3D assets
      chunkSizeWarningLimit: 1000,
      // Enable source maps in development only
      sourcemap: mode === 'development',
    },
    
    // Development optimizations
    server: {
      hmr: {
        overlay: false,
      },
    },
    
    // Asset optimizations
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    
    // Optimize deps
    optimizeDeps: {
      include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
    },
  };
});
