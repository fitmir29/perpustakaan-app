Rails.application.routes.draw do
  devise_for :users
  devise_for :admins

  # Cek status aplikasi
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      resources :buku
      resources :peminjaman
      resources :pengembalian
    end
  end

  # root "posts#index" # aktifkan jika ada halaman utama
end
