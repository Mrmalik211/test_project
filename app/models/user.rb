class User < ApplicationRecord
  validates_uniqueness_of :email

  has_many :employments, dependent: :destroy
  accepts_nested_attributes_for :employments, reject_if: :all_blank, allow_destroy: true
end
