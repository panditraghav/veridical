// vite.config.ts
import { defineConfig } from "file:///media/raghav/Code/Projects/veridical/playground/node_modules/vite/dist/node/index.js";
import react from "file:///media/raghav/Code/Projects/veridical/playground/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/media/raghav/Code/Projects/veridical/playground";
var baseDir = `${__vite_injected_original_dirname}/..`;
var packagesDir = `${baseDir}/packages`;
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "veridical",
        replacement: `${packagesDir}/veridical/src`
      },
      {
        find: "@veridical/plugins",
        replacement: `${packagesDir}/plugins/src`
      },
      {
        find: "@veridical/nodes",
        replacement: `${packagesDir}/nodes/src`
      },
      {
        find: "@veridical/components",
        replacement: `${packagesDir}/components/src`
      },
      {
        find: "@veridical/utils",
        replacement: `${packagesDir}/utils/src`
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbWVkaWEvcmFnaGF2L0NvZGUvUHJvamVjdHMvdmVyaWRpY2FsL3BsYXlncm91bmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tZWRpYS9yYWdoYXYvQ29kZS9Qcm9qZWN0cy92ZXJpZGljYWwvcGxheWdyb3VuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbWVkaWEvcmFnaGF2L0NvZGUvUHJvamVjdHMvdmVyaWRpY2FsL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcblxyXG5jb25zdCBiYXNlRGlyID0gYCR7X19kaXJuYW1lfS8uLmA7XHJcbmNvbnN0IHBhY2thZ2VzRGlyID0gYCR7YmFzZURpcn0vcGFja2FnZXNgO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiBcInZlcmlkaWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3BhY2thZ2VzRGlyfS92ZXJpZGljYWwvc3JjYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmluZDogXCJAdmVyaWRpY2FsL3BsdWdpbnNcIixcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwYWNrYWdlc0Rpcn0vcGx1Z2lucy9zcmNgLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiBcIkB2ZXJpZGljYWwvbm9kZXNcIixcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwYWNrYWdlc0Rpcn0vbm9kZXMvc3JjYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmluZDogXCJAdmVyaWRpY2FsL2NvbXBvbmVudHNcIixcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwYWNrYWdlc0Rpcn0vY29tcG9uZW50cy9zcmNgLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiBcIkB2ZXJpZGljYWwvdXRpbHNcIixcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwYWNrYWdlc0Rpcn0vdXRpbHMvc3JjYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsU0FBUyxvQkFBb0I7QUFDL1YsT0FBTyxXQUFXO0FBRGxCLElBQU0sbUNBQW1DO0FBR3pDLElBQU0sVUFBVSxHQUFHO0FBQ25CLElBQU0sY0FBYyxHQUFHO0FBR3ZCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSDtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sYUFBYSxHQUFHO0FBQUEsTUFDcEI7QUFBQSxNQUNBO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixhQUFhLEdBQUc7QUFBQSxNQUNwQjtBQUFBLE1BQ0E7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLGFBQWEsR0FBRztBQUFBLE1BQ3BCO0FBQUEsTUFDQTtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sYUFBYSxHQUFHO0FBQUEsTUFDcEI7QUFBQSxNQUNBO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixhQUFhLEdBQUc7QUFBQSxNQUNwQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
