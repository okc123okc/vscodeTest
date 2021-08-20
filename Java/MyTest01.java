
import java.util.*;

public class MyTest01 {
    public static void main(String[] args) {

        List<Map<String, Object>> listMaps = new ArrayList<Map<String, Object>>();

        Map<String, Object> map1 = new HashMap<String, Object>();
        map1.put("1", "a");
        map1.put("2", "b");
        map1.put("3", "c");
        listMaps.add(map1);

        Map<String, Object> map2 = new HashMap<String, Object>();
        map2.put("11", "aa");
        map2.put("22", "bb");
        map2.put("33", "cc");
        listMaps.add(map2);

        for (Map<String, Object> map : listMaps) {
            for (String s : map.keySet()) {
                System.out.print(map.get(s) + "  ");
            }
        }
        System.out.println();
        System.out.println("========================");
        for (int i = 0; i < listMaps.size(); i++) {
            Map<String, Object> map = listMaps.get(i);
            Iterator iterator = map.keySet().iterator();
            while (iterator.hasNext()) {
                String string = (String) iterator.next();
                System.out.println(map.get(string));
            }
        }
        System.out.println("++++++++++++++++++++++++++++");
        for (Map<String, Object> map : listMaps) {
            for (Map.Entry<String, Object> m : map.entrySet()) {
                System.out.print(m.getKey() + "    ");
                System.out.println(m.getValue());
            }
        }
        System.out.println("-----------------------------");
    }
}


