class Group < ApplicationRecord
  has_many :users through: :user_groups
  has_many :messages
  has_many :user_groups
  validates :name, presence: true, uniqueness: true
end
