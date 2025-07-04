Rails.application.routes.draw do
  # Autentikasi User dengan controller custom
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }

  # Autentikasi Admin dengan controller custom
  devise_for :admins, controllers: {
    sessions: 'admins/sessions',
    registrations: 'admins/registrations',
    passwords: 'admins/passwords'
  }

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
