// vite.config.js
import { defineConfig } from "file:///home/teddy/projects/My-3D-Portfolio/node_modules/vite/dist/node/index.js";
import react from "file:///home/teddy/projects/My-3D-Portfolio/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
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
            vendor: ["react", "react-dom"],
            three: ["three", "@react-three/fiber", "@react-three/drei"],
            animations: ["framer-motion"]
          }
        }
      },
      // Enable compression
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: true
        }
      },
      // Increase chunk size warning limit for 3D assets
      chunkSizeWarningLimit: 1e3,
      // Enable source maps in development only
      sourcemap: mode === "development"
    },
    // Development optimizations
    server: {
      hmr: {
        overlay: false
      }
    },
    // Asset optimizations
    assetsInclude: ["**/*.gltf", "**/*.glb"],
    // Optimize deps
    optimizeDeps: {
      include: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS90ZWRkeS9wcm9qZWN0cy9NeS0zRC1Qb3J0Zm9saW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3RlZGR5L3Byb2plY3RzL015LTNELVBvcnRmb2xpby92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS90ZWRkeS9wcm9qZWN0cy9NeS0zRC1Qb3J0Zm9saW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IHBsdWdpbnMgPSBbcmVhY3QoKV07XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zLFxuICAgIGJhc2U6IFwiL1wiLFxuICAgIFxuICAgIC8vIFBlcmZvcm1hbmNlIG9wdGltaXphdGlvbnNcbiAgICBidWlsZDoge1xuICAgICAgLy8gRW5hYmxlIGNvZGUgc3BsaXR0aW5nXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgLy8gU2VwYXJhdGUgdmVuZG9yIGNodW5rcyBmb3IgYmV0dGVyIGNhY2hpbmdcbiAgICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAgIHRocmVlOiBbJ3RocmVlJywgJ0ByZWFjdC10aHJlZS9maWJlcicsICdAcmVhY3QtdGhyZWUvZHJlaSddLFxuICAgICAgICAgICAgYW5pbWF0aW9uczogWydmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBFbmFibGUgY29tcHJlc3Npb25cbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgZHJvcF9jb25zb2xlOiBtb2RlID09PSAncHJvZHVjdGlvbicsXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBJbmNyZWFzZSBjaHVuayBzaXplIHdhcm5pbmcgbGltaXQgZm9yIDNEIGFzc2V0c1xuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgICAgLy8gRW5hYmxlIHNvdXJjZSBtYXBzIGluIGRldmVsb3BtZW50IG9ubHlcbiAgICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyxcbiAgICB9LFxuICAgIFxuICAgIC8vIERldmVsb3BtZW50IG9wdGltaXphdGlvbnNcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhtcjoge1xuICAgICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcbiAgICAvLyBBc3NldCBvcHRpbWl6YXRpb25zXG4gICAgYXNzZXRzSW5jbHVkZTogWycqKi8qLmdsdGYnLCAnKiovKi5nbGInXSxcbiAgICBcbiAgICAvLyBPcHRpbWl6ZSBkZXBzXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICd0aHJlZScsICdAcmVhY3QtdGhyZWUvZmliZXInLCAnQHJlYWN0LXRocmVlL2RyZWknXSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQzNULE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFFeEIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBLElBR04sT0FBTztBQUFBO0FBQUEsTUFFTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixjQUFjO0FBQUE7QUFBQSxZQUVaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxZQUM3QixPQUFPLENBQUMsU0FBUyxzQkFBc0IsbUJBQW1CO0FBQUEsWUFDMUQsWUFBWSxDQUFDLGVBQWU7QUFBQSxVQUM5QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUVBLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSLGNBQWMsU0FBUztBQUFBLFVBQ3ZCLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsdUJBQXVCO0FBQUE7QUFBQSxNQUV2QixXQUFXLFNBQVM7QUFBQSxJQUN0QjtBQUFBO0FBQUEsSUFHQSxRQUFRO0FBQUEsTUFDTixLQUFLO0FBQUEsUUFDSCxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsZUFBZSxDQUFDLGFBQWEsVUFBVTtBQUFBO0FBQUEsSUFHdkMsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLFNBQVMsYUFBYSxTQUFTLHNCQUFzQixtQkFBbUI7QUFBQSxJQUNwRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
