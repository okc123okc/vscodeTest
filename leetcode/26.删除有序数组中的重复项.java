/*
 * @lc app=leetcode.cn id=26 lang=java
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
class Solution {
    public int removeDuplicates(int[] nums) {
        //快慢指针解法
        int len = nums.length;
        //慢 用于不同元素填入的位置
        int slow = 0;
        //快  用于遍历下标 
        int fast = 1;
        if (len == 0 || nums == null) return 0;
        while (fast < len) {
            if (nums[slow] != nums[fast]) {
                nums [slow + 1] = nums[fast];
                slow++;
            }
            fast++;
        } 
        return slow + 1;        
    }
}
// @lc code=end

