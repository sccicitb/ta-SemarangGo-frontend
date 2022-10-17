/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    VITE_PORT: number;

    VITE_APP_NAME: string;
    VITE_APP_DESCRIPTION: string;
    VITE_APP_KEYWORD: string;
    VITE_COMPANY_NAME: string;
    
    VITE_STRAPI_API: string;
    VITE_API: string;
    VITE_MOCK_API: string;
    VITE_GIT_TEST_DEBUG_UNSAFE_DIRECTORIES: boolean;
  };
}