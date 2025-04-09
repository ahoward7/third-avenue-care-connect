<template>
  <div class="w-inherit">
    <div class="shrink-0 flex items-center gap-16 h-60 mb-8">
      <AppTitle />
      <div class="shrink-0">
        <img src="~/assets/images/logo.png" class="h-52" alt="Logo">
      </div>
    </div>
    <div class="flex flex-col gap-16">
      <div class="flex">
        <div class="flex flex-col gap-4">
          <HomeHeader>
            Trusted Connections for Families and Sitters
          </HomeHeader>
          <div class="flex flex-col gap-8 pl-8">
            <HomeBody>
              <template #header>
                Trusted Babysitters with Verified Backgrounds
              </template>
              <template #body>
                We understand that your child's safety is your top priority. That's why all our babysitters and nannies are nursery-approved and have passed thorough background checks. You can always know that you're connecting with experienced and trustworthy caregivers who are committed to providing the best care for your little ones.
              </template>
            </HomeBody>
            <HomeBody>
              <template #header>
                Flexible Job Posting for Families
              </template>
              <template #body>
                Parents can easily post babysitting or nannying jobs that fit their specific needs. Whether it’s a one-time evening out or ongoing childcare support, our platform helps you connect with the right sitter.
              </template>
            </HomeBody>
            <HomeBody>
              <template #header>
                Convenient Scheduling for Sitters
              </template>
              <template #body>
                For sitters, flexibility is key. You can browse and accept jobs at your convenience, allowing you to manage your schedule effortlessly. By connecting with families in your local church, you’ll find opportunities that not only fit your availability but also align with your values and commitment to the community.
              </template>
            </HomeBody>
            <TACCButton to="/signup" class="bg-green">
              Sign Up Now
            </TACCButton>
          </div>
        </div>
        <div class="shrink-0 flex items-center px-12">
          <img src="~/assets/images/mother-daughter.png" class="h-[400px]" alt="Family">
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <HomeHeader>
          Reviews
        </HomeHeader>
        <div class="flex flex-col gap-8 pl-8">
          <HomeReview>
            Please take a minute to write a review!
          </HomeReview>
          <TACCButton class="bg-purple">
            Write a Review
          </TACCButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
