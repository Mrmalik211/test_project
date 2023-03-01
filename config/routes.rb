Rails.application.routes.draw do
  root to: 'users#index'
  post '/add_employments', to: 'users#add_employments'
  resources :users, only: %i[ new, create ]
end
