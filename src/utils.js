module.exports = {
  isGitURL(string) {
    const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|#[-\d\w._]+?)$/
    return regex.test(string)
  },
}
