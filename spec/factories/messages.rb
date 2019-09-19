FactoryBot.define do
  factory :message do
    body    {Faker::Lorem.sentence}
    image   {File.open("#{Rails.root}/spec/fixtures/test.jpg") }
    user
    group
  end
end
