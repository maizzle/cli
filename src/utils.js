module.exports = {
  isGitURL(str) {
    const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/
    return regex.test(str)
  }
}
