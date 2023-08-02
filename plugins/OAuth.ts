import UniversalSocialAuth from 'universal-social-auth';

export default (ctx, inject) => {
  inject('OAuth', new UniversalSocialAuth(ctx.$axios, { providers: {} }))
}
